import "@arkecosystem/core-test-utils";
import { utils } from "../utils";
import sleep from "sleep";
import { messages } from "../../../src/versions/2/messages";
import { delegates } from "../data";
import { secrets } from "../data";
import { constants } from "../../../src/versions/2/constants";

var globalTimestamp = 0;

const ATTRIBUTES = "attributes";
const ATTRIBUTE_TYPES = "attribute_types";
const COUNT = "count";
const SUCCESS = "success";
const MESSAGE = "message";
const TRANSACTION_ID = "transactionId";
const FALSE = false;
const TRUE = true;
const ERROR = "error";
const TRUST_POINTS = "trust_points";
const SERVICES = "services";
const ACTIVE = "active";
const TIMESTAMP_PROP = "timestamp";
const LAST_UPDATE_TIMESTAMP_PROP = "last_update_timestamp";
const REASON_PROP = "reason";
const OWNER_PROP = "owner";
const TYPE_PROP = "type";
const VALUE_PROP = "value";
const EXPIRE_TIMESTAMP_PROP = "expire_timestamp";

const SLEEP_TIME = 7001;
const ATTRIBUTE_VALIDATION_REQUESTS = "attribute_validation_requests";

// DATA

const DESCRIPTION = "description";
const SERVICE_NAME = "Ada";             // to be used by Approve Identity Use Request
const SERVICE2_NAME = "Anabella";       // to be used by End Identity Use Request
const SERVICE3_NAME = "Amy";            // to be used by Decline Identity Use Request
const SERVICE4_NAME = "Arielle";        // to be used by Cancel Identity Use Request

const SERVICE5_NAME = "Ali";            // to be used by Create Identity Use Request on Inactive Service
const SERVICE6_NAME = "Aria";           // to be used by Approve Identity Use Request on Inactive Service
const SERVICE7_NAME = "Akiane";         // to be used by End Identity Use Request on Inactive Service
const SERVICE8_NAME = "Anne";           // to be used by Decline Identity Use Request on Inactive Service
const SERVICE9_NAME = "Astrid";         // to be used by Cancel Identity Use Request on Inactive Service
const SERVICE10_NAME = "Amelie";        // to be used by Create Identity Use Request with insufficient validation
const SERVICE11_NAME = "Audrey";        // to be used by Create Identity Use Request for service with 2 required attributes, user has only one

// Actors

const OWNER = delegates[5].senderId;
const SECRET = secrets[5];
const PUBLIC_KEY = delegates[5].senderPublicKey;

const VALIDATOR = delegates[6].senderId;
const VALIDATOR_SECRET = secrets[6];
const VALIDATOR_PUBLIC_KEY = delegates[6].senderPublicKey;

const VALIDATOR_2 = delegates[7].senderId;
const VALIDATOR_SECRET_2 = secrets[7];
const VALIDATOR_PUBLIC_KEY_2 = delegates[7].senderPublicKey;

const PROVIDER = delegates[8].senderId;
const PROVIDER_SECRET = secrets[8];
const PROVIDER_PUBLIC_KEY = delegates[8].senderPublicKey;

const FIRST_NAME = "first_name";
const PHONE_NUMBER = "phone_number";
const BIRTHPLACE = "birthplace";
const ADDRESS = "address";
const SSN = "ssn";
const EMAIL = "email";
const IDENTITY_CARD = "identity_card";
const INCORRECT_TYPE = "whatevs";

const ADDRESS_VALUE = "Denver";
const NAME_VALUE = "JOE";
const SECOND_NAME_VALUE = "QUEEN";
const THIRD_ID_VALUE = "QUEENS";
const EMAIL_VALUE = "yeezy@gmail.com";
const PHONE_NUMBER_VALUE = "345654321";
const BIRTHPLACE_VALUE = "Calgary";
const NEW_ADDRESS = "Edmonton";
const NEW_ADDRESS2 = "Toronto";
const INCORRECT_ADDRESS = "ABC";

const REASON_FOR_DECLINE_1024_GOOD =
    "1000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000001";
const REASON_FOR_DECLINE_1025_TOO_LONG =
    "10000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000001";
const REASON_FOR_REJECT_1024_GOOD =
    "1000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000001";
const REASON_FOR_REJECT_1025_TOO_LONG =
    "10000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000001";

const CUSTOM_VALIDATIONS = 2;
const ONE_VALIDATION = 1;
const DESCRIPTION_VALUE = "Modus";

describe("API 2.0", () => {

    describe("Preparations - Create Attributes", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Create Attributes",
            (header, request) => {

                it("Create a non file attribute (OWNER, FIRST_NAME). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let body = createAttributeBody(<any>{});
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a non file attribute (OWNER, PHONE_NUMBER). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.value = PHONE_NUMBER_VALUE;
                    param.type = PHONE_NUMBER;

                    let body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a non file attribute (OWNER, BIRTHPLACE). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.value = BIRTHPLACE_VALUE;
                    param.type = BIRTHPLACE;

                    let body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a non file attribute (OWNER, EMAIL). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.value = EMAIL_VALUE;
                    param.type = EMAIL;

                    let body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Get the details of an attribute (OWNER, FIRST_NAME). " +
                    "EXPECTED : SUCCESS. RESULT : Attribute Details, including value, type, active, expire_timestamp", async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + FIRST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(FIRST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    //TODO
                    // expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0]).toHaveProperty(EXPIRE_TIMESTAMP_PROP);
                    expect(response.data.attributes[0].expire_timestamp).toBeNull();
                });
            });
    });

    describe("Preparations - Create Services", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Create Services",
            (header, request) => {

                it("Create a service for PROVIDER. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will store the approved + ended Identity Use request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    param.name = SERVICE2_NAME;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will store the canceled Identity Use request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE3_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will store the declined Identity Use request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE4_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will be used to create requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE5_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will be used to approve requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE6_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will be used to end requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE7_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will be used to decline requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE8_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will be used to cancel requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE9_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create a service for myself, which will require a single validation per attribute. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.attribute_types = [BIRTHPLACE];
                    param.name = SERVICE10_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Get all the services that belong to the user PROVIDER. " +
                    "EXPECTED : SUCCESS. RESULT : The services list, with 10 results", async () => {

                    const response = await utils[request]("GET", "v2/services?provider=" + PROVIDER);

                    expect(response).toBeSuccessfulResponse();
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(10);
                });
            });
    });

    describe("Preparations - Create Attribute Validation Requests", () => {

        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Create Attribute Validation Requests",
            (header, request) => {

                it("Create an attribute validation request for the PHONE_NUMBER attribute. " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = PHONE_NUMBER;

                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Create an attribute validation request for the BIRTHPLACE attribute. " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = BIRTHPLACE;

                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Create an attribute validation request for the EMAIL attribute. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = EMAIL;

                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Create an attribute validation request for the EMAIL attribute, using a different validator (VALIDATOR_2). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_2;
                    params.type = EMAIL;

                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Get the validation requests that belong to a given VALIDATOR. " +
                    "EXPECTED : SUCCESS. RESULT : VALIDATOR has multiple validation requests (3)", async () => {
                    const response = await utils[request]("GET", "v2/attribute-validations/validationrequest?validator=" + VALIDATOR);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(3);
                });

                it("Get the details of an attribute that has only PENDING_APPROVAL validation requests. " +
                    "EXPECTED : SUCCESS. RESULT : Attribute is still inactive (\"active\" is false)", async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + EMAIL);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(EMAIL_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(EMAIL);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(EXPIRE_TIMESTAMP_PROP);
                    expect(response.data.attributes[0].expire_timestamp).toBeNull();
                });
            });

    });

    describe("Preparations - Attribute Validation Requests Actions", function() {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Attribute Validation Requests Actions",
            (header, request) => {
                it("Approve a PENDING_APPROVAL validation request (OWNER, EMAIL, VALIDATOR), which will later be used for cancellation. " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = EMAIL;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Approve a PENDING_APPROVAL validation request (OWNER, EMAIL, VALIDATOR_2), which will later be used for notarization. " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = EMAIL;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Get the details of 2 validation requests after they were APPROVED. " +
                    "EXPECTED : SUCCESS. RESULT : 2 validation requests, with statuses IN_PROGRESS", async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + EMAIL);
                    const response = await utils[request]("GET", "v2/attribute-validations/validationrequest?attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(2);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                    expect(response.data.attribute_validation_requests[1]).toHaveProperty("status");

                    expect(response.data.attribute_validation_requests[0].status).toBe(constants.validationRequestStatus.IN_PROGRESS);
                    expect(response.data.attribute_validation_requests[1].status).toBe(constants.validationRequestStatus.IN_PROGRESS);

                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                    expect(response.data.attribute_validation_requests[1]).toHaveProperty("type");
                    expect(response.data.attribute_validation_requests[1]).toHaveProperty("owner");
                    expect(response.data.attribute_validation_requests[1]).toHaveProperty("last_update_timestamp");
                });

                it("Approve a PENDING_APPROVAL validation request (OWNER, PHONE_NUMBER, VALIDATOR), which will later be used for rejection. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Get the details of a validation request (OWNER, PHONE_NUMBER) that is APPROVED. " +
                    "EXPECTED : SUCCESS. RESULT : The validation request status is now IN_PROGRESS", async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);
                    const response = await utils[request]("GET", "v2/attribute-validations/validationrequest?attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(1);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                    expect(response.data.attribute_validation_requests[0].status).toBe(constants.validationRequestStatus.IN_PROGRESS);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("last_update_timestamp");
                });

                it("Cancel a PENDING_APPROVAL validation request (OWNER, BIRTHPLACE, VALIDATOR) which belongs to me. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/cancel", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Notarize an IN_PROGRESS validation request (OWNER, EMAIL, VALIDATOR_2) which belongs to me. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = EMAIL;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    params.validationType = "FACE_TO_FACE";
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it("Get the details of a validation request (OWNER, BIRTHPLACE, VALIDATOR) that is CANCELED. " +
                    "EXPECTED : SUCCESS. RESULT : The validation request status is now CANCELED", async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);
                    const response = await utils[request]("GET", "v2/attribute-validations/validationrequest?validator=" + VALIDATOR + "&attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(1);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                    expect(response.data.attribute_validation_requests[0].status).toBe(constants.validationRequestStatus.CANCELED);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("last_update_timestamp");
                });

                it("Get the details of a validation request (OWNER, EMAIL, VALIDATOR_2) that is COMPLETED. " +
                    "EXPECTED : SUCCESS. RESULT : The validation request status is now COMPLETED", async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + EMAIL);
                    const response = await utils[request]("GET", "v2/attribute-validations/validationrequest?validator=" + VALIDATOR_2 + "&attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(1);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                    expect(response.data.attribute_validation_requests[0].status).toBe(constants.validationRequestStatus.COMPLETED);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("last_update_timestamp");
                });

                it("Get the details of an attribute (OWNER, EMAIL) that has a notarized validation request. " +
                    "EXPECTED : SUCCESS. RESULT : The attribute is ACTIVE", async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + EMAIL);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(EMAIL_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(EMAIL);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(EXPIRE_TIMESTAMP_PROP);
                    expect(response.data.attributes[0].expire_timestamp).toBeNull();
                });

                it("Reject a validation request (OWNER, PHONE_NUMBER) that is IN_PROGRESS. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.reason = REASON_FOR_REJECT_1024_GOOD;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                })

                it("Get the details of a validation request (OWNER, PHONE_NUMBER, VALIDATOR) that is REJECTED. " +
                    "EXPECTED : SUCCESS. RESULT : The validation request status is REJECTED and a reason exists for the rejection", async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);
                    const response = await utils[request]("GET", "v2/attribute-validations/validationrequest?validator=" + VALIDATOR + "&attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(1);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty("attribute_id");
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty((OWNER_PROP));
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty((TYPE_PROP));
                    expect(response.data.attribute_validation_requests[0].status).toBe(constants.validationRequestStatus.REJECTED);
                    expect(response.data.attribute_validation_requests[0].reason).toBe(REASON_FOR_REJECT_1024_GOOD);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty(TIMESTAMP_PROP);
                    expect(response.data.attribute_validation_requests[0].timestamp).toBeGreaterThanOrEqual(1);
                    expect(response.data.attribute_validation_requests[0]).toHaveProperty(LAST_UPDATE_TIMESTAMP_PROP);
                    expect(response.data.attribute_validation_requests[0].last_update_timestamp).toBeGreaterThanOrEqual(1);

                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('id').to.be.at.least(1);
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('attribute_id').to.be.at.least(1);
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('status').to.be.eq(constants.validationRequestStatus.REJECTED);
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('type');
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('owner');
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('reason').to.be.eq(REASON_1024_GOOD);
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('timestamp').to.be.at.least(1);
                    // node.expect(res.body.attribute_validation_requests[0]).to.have.property('last_update_timestamp').to.be.at.least(1);
                })
            });
    });
});

function createAttributeBody(param) {
    let request = <any>{};
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.attribute = [];
    request.asset.attribute[0] = {};
    request.asset.attribute[0].type = param.type ? param.type : FIRST_NAME;
    request.asset.attribute[0].owner = param.owner ? param.owner : OWNER;
    request.asset.attribute[0].value = param.value ? param.value : NAME_VALUE;
    if (param.associations) {
        request.asset.attribute[0].associations = param.associations;
    }
    if (param.expire_timestamp) {
        request.asset.attribute[0].expire_timestamp = param.expire_timestamp;
    }

    return request;
}

function createAttributeValidationRequestBody(param) {

    let request = <any>{};
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.validation = [];
    request.asset.validation[0] = {};
    if (param.type) {
        request.asset.validation[0].type = param.type;
    }
    if (param.attributeId) {
        request.asset.validation[0].attributeId = param.attributeId;
    }
    request.asset.validation[0].owner = param.owner ? param.owner : OWNER;
    request.asset.validation[0].validator = param.validator ? param.validator : VALIDATOR;

    console.log(request);
    return request;
}

function createAnswerAttributeValidationRequest(param) {
    let request = <any>{};
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.validation = [];
    request.asset.validation[0] = {};
    request.asset.validation[0].owner = param.owner ? param.owner : OWNER;
    request.asset.validation[0].validator = param.validator ? param.validator : VALIDATOR;
    if (param.type) {
        request.asset.validation[0].type = param.type;
    }
    if (param.attributeId) {
        request.asset.validation[0].attributeId = param.attributeId;
    }
    if (param.validationType) {
        request.asset.validation[0].validationType = param.validationType;
    }
    if (param.reason) {
        request.asset.validation[0].reason = param.reason;
    }

    console.log(request);
    return request;
}

function createServiceRequest(param) {
    let request = <any>{};
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : PROVIDER_SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PROVIDER_PUBLIC_KEY;
    request.asset = {};
    request.asset.service = {};
    request.asset.service.name = param.name ? param.name : SERVICE_NAME;
    request.asset.service.description = param.description ? param.description : DESCRIPTION_VALUE;
    request.asset.service.provider = param.provider ? param.provider : PROVIDER;
    request.asset.service.attribute_types = param.attribute_types ? param.attribute_types : [IDENTITY_CARD];
    request.asset.service.validations_required = param.validations ? param.validations : CUSTOM_VALIDATIONS;

    console.log(JSON.stringify(request));
    return request;
}

