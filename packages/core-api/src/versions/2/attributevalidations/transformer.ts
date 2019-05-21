// import { app } from "@arkecosystem/core-container";
// import { Database } from "@arkecosystem/core-interfaces";

export function transformAttributeValidationRequest(validation) {
    if (!validation.reason) {
        validation.reason = null;
    }
    console.log(JSON.stringify(validation))
    return {
        id: validation.id,
        attribute_id: validation.attributeId,
        validation_type: validation.validationType,
        validator: validation.validator,
        status: validation.status,
        reason: validation.reason,
        timestamp: validation.timestamp,
    };
}
