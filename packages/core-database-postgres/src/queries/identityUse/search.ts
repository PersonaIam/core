export const QueriesIdentityUse = {
    getIdentityUseRequestsByServiceId:
        "SELECT iur.owner,s.attribute_types,s.name,s.provider,s.description,iur.timestamp,iur.id,iur.status,iur.reason,iur.attributes,s.status as service_status " +
        "FROM identity_use_requests iur " +
        "JOIN services s ON s.id = iur.service_id " +
        'WHERE "service_id" = ${service_id}',

    getIdentityUseRequestsByServiceNameAndProvider:
        "SELECT iur.owner,s.attribute_types,s.name,s.provider,s.description,iur.timestamp,iur.id,iur.status,iur.reason,iur.attributes,s.status as service_status " +
        "FROM identity_use_requests iur " +
        "JOIN services s ON s.id = iur.service_id " +
        "WHERE s.name = ${service_name} AND s.provider = ${service_provider}",

    getIdentityUseRequestsByServiceProvider:
        "SELECT iur.owner,s.attribute_types,s.name,s.provider,s.description,iur.timestamp,iur.id,iur.status,iur.reason,iur.attributes,s.status as service_status " +
        "FROM identity_use_requests iur " +
        "JOIN services s ON s.id = iur.service_id " +
        "WHERE s.provider = ${service_provider}",

    getIdentityUseRequestsByOwner:
        "SELECT iur.owner,s.attribute_types,s.name,s.provider,s.description,iur.timestamp,iur.id,iur.status,iur.reason,iur.attributes,s.status as service_status " +
        "FROM identity_use_requests iur " +
        "JOIN services s ON s.id = iur.service_id " +
        "WHERE iur.owner = ${owner}",

    getIdentityUseRequestsByServiceAndOwner:
        "SELECT iur.owner,s.attribute_types,s.name,s.provider,s.description,iur.timestamp,iur.id,iur.status,iur.reason,iur.attributes,s.status as service_status " +
        "FROM identity_use_requests iur " +
        "JOIN services s ON s.id = iur.service_id " +
        "WHERE iur.owner = ${owner} AND s.id = ${service_id}",

    getAnsweredValidationRequestsForIdentityUseRequest:
        "SELECT avr.id,avr.attribute_id,avr.validator,avr.status,avr.validation_type,a.type from attribute_validation_requests avr " +
        "JOIN attributes a ON avr.attribute_id = a.id " +
        "JOIN identity_use_requests iur ON iur.owner = a.owner " +
        "JOIN attribute_validation_request_actions avra ON avra.attribute_validation_request_id = avr.id " +
        "WHERE iur.owner = ${owner} AND iur.service_id = ${service_id} AND (avra.action = 'NOTARIZE' OR avra.action = 'REJECT')",

    updateIdentityUseWithReason:
        "UPDATE identity_use_requests SET status = ${status}, reason = ${reason} WHERE id = ANY(ARRAY[${ids}])",
};
