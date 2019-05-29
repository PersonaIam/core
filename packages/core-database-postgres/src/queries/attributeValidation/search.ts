export const QueriesValidation = {

    getAttributeValidationsForAttributeAndStatusQuery:
    "SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp " +
    "FROM attribute_validation_requests avr " +
    "JOIN attributes a ON a.id = avr.attribute_id " +
    "LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) " +
    "WHERE \"attribute_id\" = ${attributeId} AND \"status\" = ${status} AND avr.timestamp > a.timestamp AND avr.timestamp > ${timespan}",
    getAttributeValidationRequestsForAttribute:
    "SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp " +
    "FROM attribute_validation_requests avr " +
    "JOIN attributes a ON a.id = avr.attribute_id " +
    "LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) " +
    "WHERE \"attribute_id\" = ${attributeId} AND avr.timestamp > a.timestamp",
    getAttributeValidationRequestsForAttributeAndValidator:
    "SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp " +
    "FROM attribute_validation_requests avr " +
    "JOIN attributes a ON a.id = avr.attribute_id " +
    "LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) " +
    "WHERE \"attribute_id\" = ${attributeId} AND \"validator\" = ${validator} AND avr.timestamp > a.timestamp",
    getAttributeValidationRequestsForOwner:
    "SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp " +
    "FROM attribute_validation_requests avr " +
    "JOIN attributes a ON a.id = avr.attribute_id " +
    "LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) " +
    "WHERE \"owner\" = ${owner} AND avr.timestamp > a.timestamp",
    getAttributeValidationRequestsForValidator:
    "SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp " +
    "FROM attribute_validation_requests avr " +
    "JOIN attributes a ON a.id = avr.attribute_id " +
    "LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) " +
    "WHERE \"validator\" = ${validator} AND avr.timestamp > a.timestamp",
    getAttributeValidationRequestsForOwnerAndValidator:
    "SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp " +
    "FROM attribute_validation_requests avr " +
    "JOIN attributes a ON a.id = avr.attribute_id " +
    "LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) " +
    "WHERE owner = ${owner} AND \"validator\" = ${validator} AND avr.timestamp > a.timestamp",
};
