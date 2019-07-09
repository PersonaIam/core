import _ from "lodash";
import { Managers } from "../../../../../crypto";
import { Crypto } from "../../../../../crypto";
import { attributesRepository, identityUsesRepository, servicesRepository } from "../../../repositories";
import { ServerCache } from "../../../services";
import { constants } from "../constants";
import { extractAttributeDetails } from "../identitycommons";
import { messages } from "../messages";
import { paginate } from "../utils";
import { transformIdentityUseRequest } from "./transformer";

// tslint:disable-next-line:only-arrow-functions
const checkIdentityUseAnswerForErrors = function(params) {
    if (params.status === constants.identityUseRequestStatus.REJECTED) {
        return messages.IDENTITY_USE_REQUEST_REJECTED_NO_ACTION;
    }

    if (params.status === constants.identityUseRequestStatus.ENDED) {
        return messages.IDENTITY_USE_REQUEST_ENDED_NO_ACTION;
    }

    if (params.status === constants.identityUseRequestStatus.CANCELED) {
        return messages.IDENTITY_USE_REQUEST_CANCELED_NO_ACTION;
    }

    if (params.status === constants.identityUseRequestStatus.DECLINED) {
        return messages.IDENTITY_USE_REQUEST_DECLINED_NO_ACTION;
    }

    if (params.answer === constants.identityUseRequestActions.APPROVE) {
        if (params.status !== constants.identityUseRequestStatus.PENDING_APPROVAL) {
            return messages.IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL;
        }
    }
    if (params.answer === constants.identityUseRequestActions.DECLINE) {
        if (params.status !== constants.identityUseRequestStatus.PENDING_APPROVAL) {
            return messages.IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL;
        }
    }

    if (params.answer === constants.identityUseRequestActions.END) {
        if (params.status !== constants.identityUseRequestStatus.ACTIVE) {
            return messages.IDENTITY_USE_REQUEST_NOT_ACTIVE;
        }
    }

    if (params.answer === constants.identityUseRequestActions.CANCEL) {
        if (params.status !== constants.identityUseRequestStatus.PENDING_APPROVAL) {
            return messages.IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL;
        }
    }

    return undefined;
};

const getIdentityUseRequest = async request => {
    if (
        !request.query.serviceProvider &&
        !request.query.serviceId &&
        !(request.query.serviceName && request.query.serviceProvider) &&
        !request.query.attributeId &&
        !request.query.owner
    ) {
        return { error: messages.INCORRECT_IDENTITY_USE_PARAMETERS, success: false };
    }

    const identityUseRequests = await identityUsesRepository.getIdentityUseRequest({
        owner: request.query.owner,
        serviceName: request.query.serviceName,
        serviceProvider: request.query.serviceProvider,
        serviceId: request.query.serviceId,
    });

    const identityUseRequestsResult = identityUseRequests[0].map(identityUseRequest =>
        transformIdentityUseRequest(identityUseRequest),
    );

    if (identityUseRequestsResult.length > 0 && request.query.serviceId && request.query.owner) {
        // only get validation requests if there is a single IdentityUseRequest to retrieve
        let identityUseRequestsWithValidationDetails = await identityUsesRepository.getIdentityUseRequestWithValidationDetails(
            { service_id: request.query.serviceId, owner: request.query.owner },
        );

        const attributeTypes = identityUseRequests[0][0].attributeTypes;
        identityUseRequestsWithValidationDetails = identityUseRequestsWithValidationDetails[0].filter(
            validationRequest => attributeTypes.includes(validationRequest.type),
        );
        return {
            identity_use_requests: identityUseRequestsResult,
            count: identityUseRequests[0].length,
            success: true,
            validation_requests_count: identityUseRequestsWithValidationDetails.length,
            validation_requests: identityUseRequestsWithValidationDetails,
        };
    } else {
        return {
            identity_use_requests: identityUseRequestsResult,
            count: identityUseRequests[0].length,
            success: true,
        };
    }
};

const createIdentityUseRequest = async request => {
    const responseObject = {} as any;

    // sender of the transaction must be the owner of the identity use request
    const senderAddress = Crypto.Validations.getAddress(
        request.payload.publicKey,
        Managers.configManager.get("pubKeyHash"),
    );
    if (senderAddress !== request.payload.asset.identityuse[0].owner) {
        responseObject.success = false;
        responseObject.error = messages.IDENTITY_USE_REQUEST_SENDER_IS_NOT_OWNER_ERROR;
        return responseObject;
    }
    const services = await servicesRepository.search({
        name: request.payload.asset.identityuse[0].serviceName,
        provider: request.payload.asset.identityuse[0].serviceProvider,
    });

    if (!services || !services.rows || services.rows.length === 0) {
        return { error: messages.SERVICE_NOT_FOUND, success: false };
    }

    // identity use requests cannot be created on inactive services
    if (services.rows[0].status === constants.serviceStatus.INACTIVE) {
        return { error: messages.IDENTITY_USE_REQUEST_FOR_INACTIVE_SERVICE, success: false };
    }
    request.payload.asset.identityuse[0].service_id = services.rows[0].id;
    let ownerAttributes = await attributesRepository.search({
        owner: request.payload.asset.identityuse[0].owner,
    });

    ownerAttributes = await extractAttributeDetails(ownerAttributes.rows, {
        owner: request.payload.asset.identityuse[0].owner,
    });
    const serviceAttributes = JSON.parse(services.rows[0].attributeTypes);

    request.payload.asset.identityuse[0].attributes.map(attribute => {
        const filterElement = ownerAttributes.filter(attr => attr.type === attribute.type)[0];
        if (filterElement) {
            attribute.attributeId = filterElement.id;
        }
    });
    const ownerAttributesActiveNotExpiredWithValidations = ownerAttributes.filter(
        attribute =>
            attribute.active && // attribute has to be active
            (!attribute.expireTimestamp || attribute.expireTimestamp > Crypto.Slots.getTime()) && // attribute has to not be expired
            attribute.completed >= services.rows[0].validationsRequired,
    ); // attribute has to have minimum required validations

    const ownerAttributesToCheck = ownerAttributesActiveNotExpiredWithValidations.map(attribute => attribute.type);

    const ownerAttributeTypes = ownerAttributes.map(attribute => attribute.type);

    const identityRequestAttributes = request.payload.asset.identityuse[0].attributes;
    const identityRequestAttributesTypes = identityRequestAttributes.map(attribute => attribute.type);

    if (_.intersection(ownerAttributeTypes, serviceAttributes).length !== serviceAttributes.length) {
        return { error: messages.REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING, success: false };
    }

    if (_.intersection(ownerAttributesToCheck, serviceAttributes).length !== serviceAttributes.length) {
        return { error: messages.REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE, success: false };
    }

    if (_.intersection(identityRequestAttributesTypes, serviceAttributes).length !== serviceAttributes.length) {
        return { error: messages.REQUIRED_SERVICE_ATTRIBUTES_VALUES_ARE_MISSING, success: false };
    }

    const identityUseRequest = await identityUsesRepository.getIdentityUseRequest({
        serviceId: services.rows[0].id,
        owner: request.payload.asset.identityuse[0].owner,
    });
    let identityUseRequests = identityUseRequest[0];

    // Filter out canceled, ended and declined identity use requests, creating a new request should be allowed in these cases
    const statusesToFilterOut = [];
    statusesToFilterOut.push(constants.identityUseRequestStatus.ENDED);
    statusesToFilterOut.push(constants.identityUseRequestStatus.DECLINED);
    statusesToFilterOut.push(constants.identityUseRequestStatus.CANCELED);
    if (identityUseRequests && identityUseRequests.length > 0) {
        identityUseRequests = identityUseRequests.filter(
            identityUseRequest => statusesToFilterOut.indexOf(identityUseRequest.status) === -1,
        );
    }
    if (
        identityUseRequests &&
        identityUseRequests.length > 0 &&
        identityUseRequests[0].status === constants.identityUseRequestStatus.PENDING_APPROVAL
    ) {
        return { error: messages.PENDING_APPROVAL_IDENTITY_USE_REQUEST_ALREADY_EXISTS, success: false };
    }

    if (
        identityUseRequests &&
        identityUseRequests.length > 0 &&
        identityUseRequests[0].status === constants.identityUseRequestStatus.ACTIVE
    ) {
        return { error: messages.ACTIVE_IDENTITY_USE_REQUEST_ALREADY_EXISTS, success: false };
    }

    const putResponse = await identityUsesRepository.createIdentityUseRequest(request.payload);
    if (putResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = putResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = putResponse.error;
    }
    return responseObject;
};

const identityUseRequestAnswer = async (request, action) => {
    if (!request.payload.asset.identityuse[0].reason && action === constants.identityUseRequestActions.END) {
        return { error: messages.END_IDENTITY_USE_REQUEST_NO_REASON, success: false };
    }

    if (!request.payload.asset.identityuse[0].reason && action === constants.identityUseRequestActions.DECLINE) {
        return { error: messages.DECLINE_IDENTITY_USE_REQUEST_NO_REASON, success: false };
    }

    if (request.payload.asset.identityuse[0].reason && request.payload.asset.identityuse[0].reason.length > 1024) {
        return { error: messages.REASON_TOO_BIG, success: false };
    }

    const responseObject = {} as any;

    const services = await servicesRepository.search({
        name: request.payload.asset.identityuse[0].serviceName,
        provider: request.payload.asset.identityuse[0].serviceProvider,
    });

    if (!services || !services.rows || services.rows.length === 0) {
        return { error: messages.SERVICE_NOT_FOUND, success: false };
    }

    if (services.rows[0].status === constants.serviceStatus.INACTIVE) {
        return { error: messages.IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE, success: false };
    }

    const identityUseRequest = await identityUsesRepository.getIdentityUseRequest({
        serviceId: services.rows[0].id,
        owner: request.payload.asset.identityuse[0].owner,
    });

    if (!identityUseRequest || !identityUseRequest[0][0]) {
        return { error: messages.IDENTITY_USE_REQUEST_MISSING_FOR_ACTION, success: false };
    }

    // only service providers can answer with an identityUseRequestProviderAction
    const senderAddress = Crypto.Validations.getAddress(
        request.payload.publicKey,
        Managers.configManager.get("pubKeyHash"),
    );
    if (action in constants.identityUseRequestProviderActions) {
        if (senderAddress !== request.payload.asset.identityuse[0].serviceProvider) {
            return { error: messages.IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_PROVIDER_ERROR, success: false };
        }
    }

    // only owners can answer with an identityUseRequestOwnerAction
    if (action in constants.identityUseRequestOwnerActions) {
        if (senderAddress !== request.payload.asset.identityuse[0].owner) {
            return { error: messages.IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_OWNER_ERROR, success: false };
        }
    }

    request.payload.asset.identityuse[0].service_id = services.rows[0].id;
    request.payload.asset.identityuse[0].id = identityUseRequest[0][0].id;
    request.payload.asset.identityuse[0].attributes = identityUseRequest[0][0].attributes;
    let putResponse;
    const identityUseAnswerError = checkIdentityUseAnswerForErrors({
        status: identityUseRequest[0][0].status,
        answer: action,
    });
    if (identityUseAnswerError) {
        return { error: identityUseAnswerError, success: false };
    }
    if (action === constants.identityUseRequestActions.APPROVE) {
        putResponse = await identityUsesRepository.approveIdentityUseRequest(request.payload);
    } else if (action === constants.identityUseRequestActions.DECLINE) {
        putResponse = await identityUsesRepository.declineIdentityUseRequest(request.payload);
    } else if (action === constants.identityUseRequestActions.END) {
        putResponse = await identityUsesRepository.endIdentityUseRequest(request.payload);
    } else if (action === constants.identityUseRequestActions.CANCEL) {
        putResponse = await identityUsesRepository.cancelIdentityUseRequest(request.payload);
    }
    if (putResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = putResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = putResponse.error;
    }

    return responseObject;
};

export const registerMethods = (server): void => {
    ServerCache.make(server)
        .method("v2.identityuses.getIdentityUseRequest", getIdentityUseRequest, 6, request => ({
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.identityuses.identityUseRequestAnswer", identityUseRequestAnswer, 6, request => ({
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.identityuses.createIdentityUseRequest", createIdentityUseRequest, 6, request => ({
            ...request.query,
            ...paginate(request),
        }));
};
