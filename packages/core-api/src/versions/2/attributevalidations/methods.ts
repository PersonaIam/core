import Boom from "boom";
import { attributesRepository, attributeValidationsRepository, attributeTypesRepository } from "../../../repositories";
import { ServerCache } from "../../../services";
import { paginate } from "../utils";
import { transformAttributeValidationRequest} from "./transformer";
import { crypto, configManager, slots } from "@arkecosystem/crypto";
import { messages } from "../messages";
import { constants } from "../constants";
var moment = require('moment');


const getAttributeValidationRequest = async request => {

    if (!request.query.attributeId && !request.query.validator && !request.query.owner) {
        return {"error" : messages.INCORRECT_VALIDATION_REQUEST_PARAMETERS, "success": false};
    }

    //     if (!crypto.validateAddress(request.query.owner, configManager.get("pubKeyHash"))) {
    //         return {"error" : messages.INVALID_OWNER_ADDRESS, "success": false};
    //     }
    request.query.attribute_id = request.query.attributeId;
    const attributeValidationRequests = await attributeValidationsRepository.search({
        ...request.payload,
        ...request.query,
        ...paginate(request),
    });

    let attributeValidationRequestsResult = attributeValidationRequests.rows.map(
        attributeValidationRequest => transformAttributeValidationRequest(attributeValidationRequest));
    return {"attribute_validation_requests" : attributeValidationRequestsResult, "count" : attributeValidationRequests.rows.length, "success": true}
};

const createAttributeValidationRequest = async (request) => {

    let responseObject = <any>{};

    const attribute = await attributesRepository.search({
        owner : request.payload.asset.validation[0].owner,
        type : request.payload.asset.validation[0].type,
        id : request.payload.asset.validation[0].attributeId
    });
    // console.log('attribute before search : ' + JSON.stringify(request.payload.asset.validation[0]))
    // console.log('attribute after search : ' + JSON.stringify(attribute))
    if (!crypto.validateAddress(request.payload.asset.validation[0].owner, configManager.get("pubKeyHash"))) {
        responseObject.success = false;
        responseObject.error = messages.INVALID_OWNER_ADDRESS;
        return responseObject;
    }
    if (!crypto.validateAddress(request.payload.asset.validation[0].validator, configManager.get("pubKeyHash"))) {
        responseObject.success = false;
        responseObject.error = messages.INVALID_VALIDATOR_ADDRESS;
        return responseObject;
    }

    if (request.payload.asset.validation[0].validator === request.payload.asset.validation[0].owner) {
        responseObject.success = false;
        responseObject.error = messages.OWNER_IS_VALIDATOR_ERROR;
        return responseObject;
    }

    if (!attribute || !attribute.rows || attribute.rows.length === 0) {
        responseObject.success = false;
        responseObject.error = messages.ATTRIBUTE_NOT_FOUND;
        return responseObject;
    }

    const validationRequest = await attributeValidationsRepository.search({
        attribute_id : attribute.rows[0].id,
        validator : request.payload.asset.validation[0].validator
    });

    if (validationRequest.rows && validationRequest.rows.length > 0) {

        if (validationRequest.rows[0].status === constants.validationRequestStatus.PENDING_APPROVAL) {
            responseObject.success = false;
            responseObject.error = messages.PENDING_APPROVAL_VALIDATION_REQUEST_ALREADY_EXISTS;
            return responseObject;
        }

        if (validationRequest.rows[0].status === constants.validationRequestStatus.IN_PROGRESS) {
            responseObject.success = false;
            responseObject.error = messages.IN_PROGRESS_VALIDATION_REQUEST_ALREADY_EXISTS;
            return responseObject;
        }

        if (validationRequest.rows[0].status === constants.validationRequestStatus.COMPLETED) {
            responseObject.success = false;
            responseObject.error = messages.COMPLETED_VALIDATION_REQUEST_ALREADY_EXISTS;
            return responseObject;
        }
    }

    const attributeTypes = await attributeTypesRepository.findAll();
    let attributeType = attributeTypes.rows.filter(attributeType => attributeType.name === attribute.rows[0].type)[0];
    let attributeTypeOptions = JSON.parse(attributeType.options);
    if (attributeTypeOptions && attributeTypeOptions.documentRequired === true && !attribute.rows[0].documented) {
        responseObject.success = false;
        responseObject.error = messages.ATTRIBUTE_WITH_NO_ASSOCIATIONS_CANNOT_BE_VALIDATED;
        return responseObject;
    }

    request.payload.asset.validation[0].attribute_id = attribute.rows[0].id;

    let putResponse = await attributeValidationsRepository.createAttributeValidationRequest(request.payload);
    if (putResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = putResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = putResponse.error;
    }
    return responseObject;
};

const attributeValidationRequestAnswer = async (request, action) => {

    const attribute = await attributesRepository.search({
        owner : request.payload.asset.validation[0].owner,
        type : request.payload.asset.validation[0].type
    });

    if (!attribute || !attribute.rows || attribute.rows.length === 0) {
        return {"error" : messages.ATTRIBUTE_NOT_FOUND, "success": false};
    }

    let attributeValidationRequest = await attributeValidationsRepository.search({
        attribute_id : attribute.rows[0].id,
        validator : request.payload.asset.validation[0].validator
        //TODO : sort descending by timestamp, only 1 non completed AVR must exist at any point for a <attribute,validator> pair
    });
    // console.log('attributeValidationRequest = ' + JSON.stringify(attributeValidationRequest))
    if (!attributeValidationRequest || !attributeValidationRequest.rows || attributeValidationRequest.rows.length === 0) {
        return {"error" : messages.VALIDATION_REQUEST_MISSING_FOR_ACTION, "success": false};
    }

     // only validators can answer with a validationRequestValidatorAction
    let senderAddress = crypto.getAddress(request.payload.publicKey, configManager.get("pubKeyHash"));
    if (action in constants.validationRequestValidatorActions){
        if (senderAddress !== request.payload.asset.validation[0].validator) {
            return {"error" : messages.VALIDATION_REQUEST_ANSWER_SENDER_IS_NOT_VALIDATOR_ERROR, "success": false};
        }
    }

    // only owners can answer with a validationRequestOwnerActions
    if (action in constants.validationRequestOwnerActions){
        if (senderAddress !== request.payload.asset.validation[0].owner) {
            return {"error" : messages.VALIDATION_REQUEST_ANSWER_SENDER_IS_NOT_OWNER_ERROR, "success": false};
        }
    }

    // Filter out canceled, completed, rejected and declined validation requests, no answer can be performed on these types of requests
    let statusesToFilterOut = [];
    statusesToFilterOut.push(constants.validationRequestStatus.REJECTED);
    statusesToFilterOut.push(constants.validationRequestStatus.DECLINED);
    statusesToFilterOut.push(constants.validationRequestStatus.COMPLETED);
    statusesToFilterOut.push(constants.validationRequestStatus.CANCELED);
    if (attributeValidationRequest && attributeValidationRequest.rows.length > 0) {
        attributeValidationRequest.rows = attributeValidationRequest.rows.filter(validationRequest => statusesToFilterOut.indexOf(validationRequest.status) === -1)
    }
    if (attributeValidationRequest && attributeValidationRequest.rows.length === 0) {
        return {"error" : messages.VALIDATION_REQUEST_MISSING_IN_STATUS_FOR_ACTION, "success": false};
    }

    // Only PENDING_APPROVAL Validation Requests can be approved, declined or canceled
    if (action === constants.validationRequestActions.APPROVE) {
        if (attributeValidationRequest.rows[0].status !== constants.validationRequestStatus.PENDING_APPROVAL) {
            return {"error" : messages.ATTRIBUTE_VALIDATION_REQUEST_NOT_PENDING_APPROVAL, "success": false};
        }
    }

    if (action === constants.validationRequestActions.DECLINE) {
        if (!request.payload.asset.validation[0].reason) {
            return {"error" : messages.DECLINE_ATTRIBUTE_VALIDATION_REQUEST_NO_REASON, "success": false }
        }
        if (request.payload.asset.validation[0].reason.length > 1024) {
            return {"error" : messages.REASON_TOO_BIG_DECLINE, "success": false }
        }
        if (attributeValidationRequest.rows[0].status !== constants.validationRequestStatus.PENDING_APPROVAL) {
            return {"error" : messages.ATTRIBUTE_VALIDATION_REQUEST_NOT_PENDING_APPROVAL, "success": false};
        }
    }

    if (action === constants.validationRequestActions.CANCEL) {
        if (attributeValidationRequest.rows[0].status !== constants.validationRequestStatus.PENDING_APPROVAL) {
            return {"error" : messages.ATTRIBUTE_VALIDATION_REQUEST_NOT_PENDING_APPROVAL, "success": false};
        }
    }

    // Only IN_PROGRESS Validation Requests can be notarized or rejected
    if (action === constants.validationRequestActions.NOTARIZE) {
        if (!request.payload.asset.validation[0].validationType) {
            return {"error" : messages.MISSING_VALIDATION_TYPE, "success": false};
        }
        if (!(request.payload.asset.validation[0].validationType in constants.validationType)) {
            return {"error" : messages.INCORRECT_VALIDATION_TYPE, "success": false};
        }
        if (attributeValidationRequest.rows[0].status !== constants.validationRequestStatus.IN_PROGRESS) {
            return {"error" : messages.ATTRIBUTE_VALIDATION_REQUEST_NOT_IN_PROGRESS, "success": false};
        }
    }

    if (action === constants.validationRequestActions.REJECT) {
        if (!request.payload.asset.validation[0].reason) {
            return {"error" : messages.REJECT_ATTRIBUTE_VALIDATION_REQUEST_NO_REASON, "success": false }
        }
        if (request.payload.asset.validation[0].reason.length > 1024) {
            return {"error" : messages.REASON_TOO_BIG_REJECT, "success": false }
        }

        if (attributeValidationRequest.rows[0].status !== constants.validationRequestStatus.IN_PROGRESS) {
            return {"error" : messages.ATTRIBUTE_VALIDATION_REQUEST_NOT_IN_PROGRESS, "success": false};
        }
    }
    request.payload.asset.validation[0].attribute_id = attribute.rows[0].id;
    request.payload.asset.validation[0].id = attributeValidationRequest.rows[0].id;
    let putResponse = null;
    if (action === "APPROVE") {
        putResponse = await attributeValidationsRepository.approveAttributeValidationRequest(request.payload);
    } else if (action === "DECLINE") {
        putResponse = await attributeValidationsRepository.declineAttributeValidationRequest(request.payload);
    } else if (action === "REJECT") {
        putResponse = await attributeValidationsRepository.rejectAttributeValidationRequest(request.payload);
    } else if (action === "NOTARIZE") {
        putResponse = await attributeValidationsRepository.notarizeAttributeValidationRequest(request.payload);
    } else if (action === "CANCEL") {
        putResponse = await attributeValidationsRepository.cancelAttributeValidationRequest(request.payload);
    }

    let responseObject = <any>{};
    if (putResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = putResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = putResponse.error;
    }
    return responseObject;
};

const buildAttributeQuery = (request) => {
    let paramsQuery = <any>{};
    if (request.query.owner) {
        paramsQuery.owner = request.query.owner
    }
    if (request.query.attributeId) {
        paramsQuery.id = request.query.attributeId
    }
    if (request.query.type) {
        paramsQuery.type = request.query.type
    }
    return paramsQuery;
};

const buildValidationScoreQuery = (request, nrMonths, attributeId) => {
    let timespanTimestamp = slots.getTime(moment().subtract(nrMonths, 'months'));
    let attributeIdRequest = request.query.attributeId ? request.query.attributeId : attributeId;
    return {attributeId: attributeIdRequest, status : constants.validationRequestStatus.COMPLETED, timespan : timespanTimestamp}
};

const getAttributeCredibility = async request => {

    if (request.query.months === undefined) {
        return {"error" : messages.MISSING_MONTHS, "success": false};
    }

    if (!request.query.months || request.query.months <= 0) {
        return {"error" : messages.INCORRECT_MONTHS_VALUE, "success": false};
    }
    if (!request.query.owner && !request.query.attributeId ) {
        return {"error" : messages.INCORRECT_CREDIBILITY_PARAMETERS, "success": false};
    }
    if (request.query.owner && request.query.attributeId) {
        return {"error" : messages.INCORRECT_CREDIBILITY_PARAMETERS, "success": false};
    }

    let attributes = await attributesRepository.search(buildAttributeQuery(request));
    if (!attributes || !attributes.rows || attributes.rows.length === 0) {
        return { "error": messages.ATTRIBUTE_NOT_FOUND, "success": false };
    }

    let response = await attributeValidationsRepository.getAttributeValidationScore(buildValidationScoreQuery(request, request.query.months, attributes.rows[0].id));
    return {"success": true, "trust_points" : response.result[0].length}
};

const getAttributeValidationScore = async request => {

    let attributes = await attributesRepository.search(buildAttributeQuery(request));
    if (!attributes || !attributes.rows || attributes.rows.length === 0) {
        return { "error": messages.ATTRIBUTE_NOT_FOUND, "success": false };
    }

    let response = await attributeValidationsRepository.getAttributeValidationScore(buildValidationScoreQuery(request, constants.MONTHS_FOR_ACTIVE_VALIDATION, attributes.rows[0].id));
    return {"success": true, "attribute_validations" : response.result[0].length}
};


//
export function registerMethods(server) {
    ServerCache.make(server)
        .method("v2.attributevalidations.getAttributeValidationRequest", getAttributeValidationRequest, 6, request => ({
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.attributevalidations.attributeValidationRequestAnswer", attributeValidationRequestAnswer, 6, request => ({
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.attributevalidations.createAttributeValidationRequest", createAttributeValidationRequest, 6, request => ({
        ...request.query,
        ...paginate(request),
        }))
        .method("v2.attributevalidations.getAttributeCredibility", getAttributeCredibility, 6, request => ({
        ...request.query,
        ...paginate(request),
        }))
        .method("v2.attributevalidations.getAttributeValidationScore", getAttributeValidationScore, 6, request => ({
        ...request.query,
        ...paginate(request),
    }))
}
