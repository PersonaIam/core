import Boom from "boom";
import { attributesRepository, attributeTypesRepository } from "../../../repositories";
import { ServerCache } from "../../../services";
import { paginate } from "../utils";
import { transformAttributeType, transformAttribute} from "./transformer";
import { crypto, configManager } from "@arkecosystem/crypto";
import { messages } from "../messages";

const listTypes = async request => {
    const types = await attributeTypesRepository.findAll({
        ...request.query,
        ...paginate(request),
    });

    return {"attribute_types" : types.rows, "success": true, "count" : types.rows.length}
};

const getType = async request => {

    if (!request.query.name) {
        return {"error" : "Missing required property: name", "success": false};
    }

    const attributeType = await attributeTypesRepository.findByName(request.query.name);

    if (!attributeType) {
        return {"error" : messages.ATTRIBUTE_TYPE_NOT_FOUND, "success": false};
    }

    return {"attribute_type" : transformAttributeType(attributeType), "success": true}
};

const getAttribute = async request => {

    if (!request.query.owner) {
        return {"error" : "Missing required property: owner", "success": false};
    } else {
        if (!crypto.validateAddress(request.query.owner, configManager.get("pubKeyHash"))) {
            return {"error" : messages.INVALID_OWNER_ADDRESS, "success": false};
        }
    }

    const attributes = await attributesRepository.search({
        ...request.payload,
        ...request.query,
        ...paginate(request),
    });

    return {"attributes" : attributes.rows.map(attribute => transformAttribute(attribute)), "count" : attributes.length, "success": true}
};

const postAttribute = async request => {
    let responseObject = <any>{};

    const attributeTypes = await attributeTypesRepository.findAll();

    let attributeTypesNames = attributeTypes.rows.map(o => o.name);
    let attributeFileTypesNames = attributeTypes.rows.filter(i => i.dataType === "file").map(o => o.name);
    if (!attributeTypesNames.includes(request.payload.asset.attribute[0].type)) {
        responseObject.success = false;
        responseObject.error = messages.ATTRIBUTE_TYPE_NOT_FOUND;
        return responseObject;
    }

    if (request.payload.asset.attribute[0].associations && !attributeFileTypesNames.includes(request.payload.asset.attribute[0].type)) {
        responseObject.success = false;
        responseObject.error = messages.ASSOCIATIONS_NOT_SUPPORTED_FOR_NON_FILE_TYPES;
        return responseObject;
    }
    if (!crypto.validateAddress(request.payload.asset.attribute[0].owner, configManager.get("pubKeyHash"))) {
        responseObject.success = false;
        responseObject.error = messages.INVALID_OWNER_ADDRESS;
        return responseObject;
    }

    let senderAddress = crypto.getAddress(request.payload.publicKey, configManager.get("pubKeyHash"));
    if (senderAddress !== request.payload.asset.attribute[0].owner ) {
        responseObject.success = false;
        responseObject.error = messages.SENDER_IS_NOT_OWNER;
        return responseObject;
    }
    if (request.payload.asset.attribute[0].associations) {
        let attributes = await attributesRepository.findByCriteria({ owner: request.payload.asset.attribute[0].owner });
        let dataAttributeIds = attributes ? attributes.map(attribute => attribute.id) : [];
        let diffOwners = false;
        request.payload.asset.attribute[0].associations.forEach(function(association) {
            if (!dataAttributeIds.includes(association)) {
                diffOwners = true;
            }
        });
        if (diffOwners) {
            responseObject.success = false;
            responseObject.error = messages.ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER;
            return responseObject;
        }
    }

    if (!request.payload.asset.attribute[0].expire_timestamp) {
        request.payload.asset.attribute[0].expire_timestamp = null;
    }

    let postResponse = await attributesRepository.postAttribute(request.payload);;

    if (postResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = postResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = postResponse.error;
    }
    return responseObject;

};

const putAttribute = async request => {
    let responseObject = <any>{};

    // const attributeTypes = await attributeTypesRepository.findAll();
    const attributesForOwner = await attributesRepository.search({
        owner : request.payload.asset.attribute[0].owner
    });
    const attributeToUpdate = attributesForOwner.rows.filter(attribute => attribute.id === request.payload.asset.attribute[0].id)
    if (!attributeToUpdate || attributeToUpdate.length === 0) {
        responseObject.success = false;
        responseObject.error = messages.ATTRIBUTE_NOT_FOUND_FOR_UPDATE;
        return responseObject;
    }

    if (!crypto.validateAddress(request.payload.asset.attribute[0].owner, configManager.get("pubKeyHash"))) {
        responseObject.success = false;
        responseObject.error = messages.INVALID_OWNER_ADDRESS;
        return responseObject;
    }

    let senderAddress = crypto.getAddress(request.payload.publicKey, configManager.get("pubKeyHash"));
    if (senderAddress !== attributeToUpdate[0].owner ) {
        responseObject.success = false;
        responseObject.error = messages.SENDER_IS_NOT_OWNER;
        return responseObject;
    }

    if ((!request.payload.asset.attribute[0].value || request.payload.asset.attribute[0].value === attributeToUpdate[0].value) &&
        (!request.payload.asset.attribute[0].expire_timestamp || request.payload.asset.attribute[0].expire_timestamp === attributeToUpdate[0].expire_timestamp) &&
        (!request.payload.asset.attribute[0].associations || request.payload.asset.attribute[0].associations === attributeToUpdate[0].associations)) {
        responseObject.success = true;
        responseObject.message = messages.NOTHING_TO_UPDATE;
        return responseObject;
    }

    if (!request.payload.asset.attribute[0].expire_timestamp) {
        request.payload.asset.attribute[0].expire_timestamp = attributeToUpdate[0].expireTimestamp;
    }
    if (!request.payload.asset.attribute[0].value) {
        request.payload.asset.attribute[0].value = attributeToUpdate[0].value;
    }

    let putResponse = await attributesRepository.putAttribute(request.payload);;

    if (putResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = putResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = putResponse.error;
    }
    return responseObject;
};

export function registerMethods(server) {
    ServerCache.make(server)
        .method("v2.attributes.getAttribute", getAttribute, 6, request => ({
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.attributes.postAttribute", postAttribute, 600, request => ({ id: request.params.id }))
        .method("v2.attributes.putAttribute", putAttribute, 600, request => ({
            ...{ id: request.params.id },
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.attributes.listTypes", listTypes, 30, request => ({
            ...request.payload,
            ...request.query,
            ...paginate(request),
        }))
        .method("v2.attributes.getType", getType, 30, request => ({
        ...request.payload,
        ...request.query,
        ...paginate(request),
    }));
}
