import { configManager, crypto } from "@arkecosystem/crypto";
import Boom from "boom";
import { servicesRepository } from "../../../repositories";
import { ServerCache } from "../../../services";
import { constants } from "../constants";
import { messages } from "../messages";
import { paginate } from "../utils";
import { transformService } from "./transformer";

const postService = async request => {
    if (!request.payload.asset.service.description) {
        return { error: messages.MISSING_SERVICE_DESCRIPTION, success: false };
    }
    if (!request.payload.asset.service.attribute_types) {
        return { error: messages.MISSING_ATTRIBUTE_TYPES, success: false };
    }
    if (!request.payload.asset.service.validations_required) {
        return { error: messages.MISSING_NUMBER_OF_VALIDATIONS_REQUIRED, success: false };
    }

    if (request.payload.asset.service.description.length > 128) {
        return { error: messages.SERVICE_DESCRIPTION_TOO_LONG, success: false };
    }

    const services = await servicesRepository.search({
        ...request.payload.asset.service,
        ...request.query,
        ...paginate(request),
    });
    if (services.rows.length > 0) {
        return { error: messages.SERVICE_ALREADY_EXISTS, success: false };
    }

    const responseObject = {} as any;
    const postResponse = await servicesRepository.postService(request.payload);

    if (postResponse.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = postResponse.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = postResponse.error;
    }

    return responseObject;
};

const getService = async request => {
    if (request.query.provider && !crypto.validateAddress(request.query.provider, configManager.get("pubKeyHash"))) {
        return { error: messages.INVALID_PROVIDER_ADDRESS, success: false };
    }

    const services = await servicesRepository.search({
        ...request.payload,
        ...request.query,
        ...paginate(request),
    });

    return {
        services: services.rows.map(service => transformService(service)),
        count: services.length,
        success: true,
    };
};

const updateServiceStatus = async (request, newStatus) => {
    const services = await servicesRepository.search({
        ...request.payload.asset.service,
        ...request.query,
        ...paginate(request),
    });

    if (!services || !services.rows || !services.rows.length) {
        return { error: messages.SERVICE_NOT_FOUND, success: false };
    }

    if (
        newStatus === constants.serviceStatus.INACTIVE &&
        services.rows[0].status === constants.serviceStatus.INACTIVE
    ) {
        return { error: messages.SERVICE_IS_ALREADY_INACTIVE, success: false };
    }

    if (newStatus === constants.serviceStatus.ACTIVE && services.rows[0].status === constants.serviceStatus.ACTIVE) {
        return { error: messages.SERVICE_IS_ALREADY_ACTIVE, success: false };
    }

    if (request.query.provider && !crypto.validateAddress(request.query.provider, configManager.get("pubKeyHash"))) {
        return { error: messages.INVALID_PROVIDER_ADDRESS, success: false };
    }

    // only providers can update their service status
    const senderAddress = crypto.getAddress(request.payload.publicKey, configManager.get("pubKeyHash"));
    if (senderAddress !== request.payload.asset.service.provider) {
        return { error: messages.SERVICE_ACTION_SENDER_IS_NOT_PROVIDER_ERROR, success: false };
    }

    request.payload.asset.service.id = services.rows[0].id;
    // request.payload.asset.service.description = services.rows[0].description;
    // request.payload.asset.service.validations_required = services.rows[0].validationsRequired;
    // request.payload.asset.service.attribute_types = services.rows[0].attributeTypes;
    const responseObject = {} as any;
    const response = await servicesRepository.putService(request.payload, newStatus);

    if (response.transactionId) {
        responseObject.success = true;
        responseObject.transactionId = response.transactionId;
    } else {
        responseObject.success = false;
        responseObject.error = response.error;
    }

    return responseObject;
};

const getAttributeTypes = async request => {
    if (!(request.query.name && request.query.provider)) {
        return { error: "The service (name and provider information) must be provided" };
    }

    if (!crypto.validateAddress(request.query.provider, configManager.get("pubKeyHash"))) {
        return { error: messages.INVALID_PROVIDER_ADDRESS, success: false };
    }

    const services = await servicesRepository.search({
        ...request.payload,
        ...request.query,
        ...paginate(request),
    });

    if (!services || !services.rows || !services.rows.length) {
        return { error: messages.SERVICE_NOT_FOUND, success: false };
    }

    return {
        service_attribute_types: JSON.parse(services.rows[0].attributeTypes),
        success: true,
    };
};

const listServices = async request => {
    const services = await servicesRepository.search({
        ...request.payload,
        ...request.query,
        ...paginate(request),
    });

    return { services: services.rows.map(service => transformService(service)), count: services.length, success: true };
};

export function registerMethods(server) {
    ServerCache.make(server)
        .method("v2.services.postService", postService, 600, request => ({ id: request.params.id }))
        .method("v2.services.getService", getService, 600, request => ({ id: request.params.id }))
        .method("v2.services.getAttributeTypes", getAttributeTypes, 600, request => ({ id: request.params.id }))
        .method("v2.services.listServices", listServices, 600, request => ({ id: request.params.id }))
        .method("v2.services.updateServiceStatus", updateServiceStatus, 600, request => ({ id: request.params.id }));
}
