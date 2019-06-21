// import { app } from "@arkecosystem/core-container";
// import { Database } from "@arkecosystem/core-interfaces";

export function transformAttributeValidationRequest(validation) {
    if (!validation.reason) {
        validation.reason = null;
    }
    return {
        id: validation.id,
        attribute_id: validation.attributeId,
        validation_type: validation.validationType,
        validator: validation.validator,
        status: validation.status,
        reason: validation.reason,
        timestamp: validation.timestamp,
        last_update_timestamp: validation.lastUpdateTimestamp,
        type: validation.type,
        owner: validation.owner,
    };
}
