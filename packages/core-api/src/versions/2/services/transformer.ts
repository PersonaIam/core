// import { app } from "@arkecosystem/core-container";
// import { Database } from "@arkecosystem/core-interfaces";

export const transformService = service => {
    return {
        id: service.id,
        name: service.name,
        provider: service.provider,
        description: service.description,
        status: service.status,
        timestamp: service.timestamp,
        attribute_types: service.attribute_types,
        validations_required: service.validations_required,
    };
};
