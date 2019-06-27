// import "@arkecosystem/core-test-utils";
import sleep from "sleep";
import { constants } from "../../../../../packages/core-api/src/versions/2/constants";
import { messages } from "../../../../../packages/core-api/src/versions/2/messages";
import { delegates } from "../data";
import { secrets } from "../data";
import { utils } from "../utils";

const ATTRIBUTES = "attributes";
const SUCCESS = "success";
const TRANSACTION_ID = "transactionId";
const FALSE = false;
const TRUE = true;
const ERROR = "error";
const SERVICES = "services";
const ACTIVE = "active";
const COMPLETED = "completed";
const TIMESTAMP_PROP = "timestamp";
const LAST_UPDATE_TIMESTAMP_PROP = "last_update_timestamp";
const OWNER_PROP = "owner";
const TYPE_PROP = "type";
const VALUE_PROP = "value";
const EXPIRE_TIMESTAMP_PROP = "expire_timestamp";

const SLEEP_TIME = 7001;
const ATTRIBUTE_VALIDATION_REQUESTS = "attribute_validation_requests";

// DATA

const DESCRIPTION = "description";
const SERVICE_NAME = "Ada"; // to be used by Approve Identity Use Request
const SERVICE2_NAME = "Anabella"; // to be used by End Identity Use Request
const SERVICE3_NAME = "Amy"; // to be used by Decline Identity Use Request
const SERVICE4_NAME = "Arielle"; // to be used by Cancel Identity Use Request
const SERVICE5_NAME = "Ali"; // to be used by Create Identity Use Request on Inactive Service
const SERVICE6_NAME = "Aria"; // to be used by Approve Identity Use Request on Inactive Service
const SERVICE7_NAME = "Akiane"; // to be used by End Identity Use Request on Inactive Service
const SERVICE8_NAME = "Anne"; // to be used by Decline Identity Use Request on Inactive Service
const SERVICE9_NAME = "Astrid"; // to be used by Cancel Identity Use Request on Inactive Service
const SERVICE10_NAME = "Amelie"; // to be used by Create Identity Use Request for a service that requires a single validation per attribute
const SERVICE11_NAME = "Audrey"; // to be used by Create Identity Use Request for service with 2 required attributes, when ser has only one
const DESCRIPTION_VALUE = "Modus";
const NON_EXISTING_SERVICE = "Evelyn"; // to be used by Create Identity Use Request for service with 2 required attributes, when ser has only one
// Actors

const OWNER = delegates[6].senderId;
const SECRET = secrets[6];
const PUBLIC_KEY = delegates[6].senderPublicKey;

const VALIDATOR = delegates[7].senderId;
const VALIDATOR_SECRET = secrets[7];
const VALIDATOR_PUBLIC_KEY = delegates[7].senderPublicKey;

const VALIDATOR_2 = delegates[8].senderId;
const VALIDATOR_SECRET_2 = secrets[8];
const VALIDATOR_PUBLIC_KEY_2 = delegates[8].senderPublicKey;

const PROVIDER = delegates[9].senderId;
const PROVIDER_SECRET = secrets[9];
const PROVIDER_PUBLIC_KEY = delegates[9].senderPublicKey;

const FIRST_NAME = "first_name";
const NAME_VALUE = "JOE";
const PHONE_NUMBER = "phone_number";
const PHONE_NUMBER_VALUE = "345654321";
const BIRTHPLACE = "birthplace";
const SSN = "ssn";
const EMAIL = "email";
const EMAIL_VALUE = "yeezy@gmail.com";
const IDENTITY_CARD = "identity_card";
const BIRTHPLACE_VALUE = "Calgary";
const SSN_VALUE = "123456754321";

const maxLength = 1024;
const REASON_1024_GOOD = new Array(1 + maxLength).join("x");
const REASON_1025_TOO_LONG = new Array(1 + maxLength + 1).join("x");

const CUSTOM_VALIDATIONS = 2;
const ONE_VALIDATION = 1;

describe("API 2.0", () => {
    describe("Preparations - Create Attributes ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Create Attributes", (header, request) => {
            it(
                "Create a non file attribute (OWNER, FIRST_NAME). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const body = createAttributeBody({} as any);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a non file attribute (OWNER, PHONE_NUMBER). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.value = PHONE_NUMBER_VALUE;
                    param.type = PHONE_NUMBER;
                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a non file attribute (OWNER, BIRTHPLACE). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.value = BIRTHPLACE_VALUE;
                    param.type = BIRTHPLACE;
                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a non file attribute (OWNER, EMAIL). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.value = EMAIL_VALUE;
                    param.type = EMAIL;
                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Get the details of an attribute (OWNER, FIRST_NAME). " +
                    "EXPECTED : SUCCESS. RESULT : Attribute Details, including value, type, active, expire_timestamp",
                async () => {
                    const response = await utils[request](
                        "GET",
                        "v2/attributes?owner=" + OWNER + "&type=" + FIRST_NAME,
                    );

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(FIRST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(EXPIRE_TIMESTAMP_PROP);
                    expect(response.data.attributes[0].expire_timestamp).toBeNull();
                },
            );
        });
    });

    describe("Preparations - Create Services ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Create Services", (header, request) => {
            it("Create a service for PROVIDER. " + "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                const param = {} as any;
                param.attribute_types = [EMAIL];
                param.description = DESCRIPTION;
                param.validations_required = CUSTOM_VALIDATIONS;
                const body = createServiceRequest(param);
                const response = await utils[request]("POST", "v2/services", body);
                sleep.msleep(SLEEP_TIME);
                expect(response.data).toHaveProperty(SUCCESS);
                expect(response.data).toHaveProperty(TRANSACTION_ID);
                expect(response.data.success).toBe(TRUE);
            });

            it(
                "Create a service for myself, which will store the approved + ended Identity Use request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    param.name = SERVICE2_NAME;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will store the canceled Identity Use request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE3_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will store the declined Identity Use request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE4_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will be used to create requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE5_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will be used to approve requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE6_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will be used to end requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE7_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will be used to decline requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE8_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will be used to cancel requests on an inactive service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE9_NAME;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Create a service for myself, which will require a single validation per attribute. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = [EMAIL];
                    param.name = SERVICE10_NAME;
                    param.description = DESCRIPTION;
                    param.validations = ONE_VALIDATION;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "Get all the services that belong to the user PROVIDER. " +
                    "EXPECTED : SUCCESS. RESULT : The services list, with 10 results",
                async () => {
                    const response = await utils[request]("GET", "v2/services?provider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(10);
                },
            );
        });
    });

    describe("Preparations - Create Attribute Validation Requests ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Create Attribute Validation Requests",
            (header, request) => {
                it(
                    "Create an attribute validation request for the PHONE_NUMBER attribute. " +
                        "EXPECTED : SUCCESS, RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.owner = OWNER;
                        params.validator = VALIDATOR;
                        params.type = PHONE_NUMBER;
                        const body = createAttributeValidationRequestBody(params);
                        const response = await utils[request](
                            "POST",
                            "v2/attribute-validations/validationrequest",
                            body,
                        );
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Create an attribute validation request for the BIRTHPLACE attribute. " +
                        "EXPECTED : SUCCESS, RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.owner = OWNER;
                        params.validator = VALIDATOR;
                        params.type = BIRTHPLACE;
                        const body = createAttributeValidationRequestBody(params);
                        const response = await utils[request](
                            "POST",
                            "v2/attribute-validations/validationrequest",
                            body,
                        );
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Create an attribute validation request for the EMAIL attribute. " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.owner = OWNER;
                        params.validator = VALIDATOR;
                        params.type = EMAIL;
                        const body = createAttributeValidationRequestBody(params);
                        const response = await utils[request](
                            "POST",
                            "v2/attribute-validations/validationrequest",
                            body,
                        );
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Create an attribute validation request for the EMAIL attribute, using a different validator (VALIDATOR_2). " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.owner = OWNER;
                        params.validator = VALIDATOR_2;
                        params.type = EMAIL;
                        const body = createAttributeValidationRequestBody(params);
                        const response = await utils[request](
                            "POST",
                            "v2/attribute-validations/validationrequest",
                            body,
                        );
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Get the validation requests that belong to a given VALIDATOR. " +
                        "EXPECTED : SUCCESS. RESULT : VALIDATOR has multiple validation requests (3)",
                    async () => {
                        const response = await utils[request](
                            "GET",
                            "v2/attribute-validations/validationrequest?validator=" + VALIDATOR,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data.attribute_validation_requests).toHaveLength(3);
                    },
                );

                it(
                    "Get the details of an attribute that has only PENDING_APPROVAL validation requests. " +
                        'EXPECTED : SUCCESS. RESULT : Attribute is still inactive ("active" is false)',
                    async () => {
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
                    },
                );
            },
        );
    });

    describe("Preparations - Attribute Validation Requests Actions ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Attribute Validation Requests Actions",
            (header, request) => {
                it(
                    "Approve a PENDING_APPROVAL validation request (OWNER, EMAIL, VALIDATOR), which will later be used for cancellation. " +
                        "EXPECTED : SUCCESS, RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.validator = VALIDATOR;
                        params.owner = OWNER;
                        params.type = EMAIL;
                        params.secret = VALIDATOR_SECRET;
                        params.publicKey = VALIDATOR_PUBLIC_KEY;
                        const body = createAnswerAttributeValidationRequest(params);
                        const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Approve a PENDING_APPROVAL validation request (OWNER, EMAIL, VALIDATOR_2), which will later be used for notarization. " +
                        "EXPECTED : SUCCESS, RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.validator = VALIDATOR_2;
                        params.owner = OWNER;
                        params.type = EMAIL;
                        params.secret = VALIDATOR_SECRET_2;
                        params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                        const body = createAnswerAttributeValidationRequest(params);
                        const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Get the details of 2 validation requests after they were APPROVED. " +
                        "EXPECTED : SUCCESS. RESULT : 2 validation requests, with statuses IN_PROGRESS",
                    async () => {
                        const attribute = await utils[request](
                            "GET",
                            "v2/attributes?owner=" + OWNER + "&type=" + EMAIL,
                        );
                        const response = await utils[request](
                            "GET",
                            "v2/attribute-validations/validationrequest?attributeId=" + attribute.data.attributes[0].id,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data.attribute_validation_requests).toHaveLength(2);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                        expect(response.data.attribute_validation_requests[1]).toHaveProperty("status");
                        expect(response.data.attribute_validation_requests[0].status).toBe(
                            constants.validationRequestStatus.IN_PROGRESS,
                        );
                        expect(response.data.attribute_validation_requests[1].status).toBe(
                            constants.validationRequestStatus.IN_PROGRESS,
                        );
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                        expect(response.data.attribute_validation_requests[1]).toHaveProperty("type");
                        expect(response.data.attribute_validation_requests[1]).toHaveProperty("owner");
                        expect(response.data.attribute_validation_requests[1]).toHaveProperty("last_update_timestamp");
                    },
                );

                it(
                    "Approve a PENDING_APPROVAL validation request (OWNER, PHONE_NUMBER, VALIDATOR), which will later be used for rejection. " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.validator = VALIDATOR;
                        params.owner = OWNER;
                        params.type = PHONE_NUMBER;
                        params.secret = VALIDATOR_SECRET;
                        params.publicKey = VALIDATOR_PUBLIC_KEY;
                        const body = createAnswerAttributeValidationRequest(params);
                        const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Get the details of a validation request (OWNER, PHONE_NUMBER) that is APPROVED. " +
                        "EXPECTED : SUCCESS. RESULT : The validation request status is now IN_PROGRESS",
                    async () => {
                        const attribute = await utils[request](
                            "GET",
                            "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER,
                        );
                        const response = await utils[request](
                            "GET",
                            "v2/attribute-validations/validationrequest?attributeId=" + attribute.data.attributes[0].id,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data.attribute_validation_requests).toHaveLength(1);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                        expect(response.data.attribute_validation_requests[0].status).toBe(
                            constants.validationRequestStatus.IN_PROGRESS,
                        );
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("last_update_timestamp");
                    },
                );

                it(
                    "Cancel a PENDING_APPROVAL validation request (OWNER, BIRTHPLACE, VALIDATOR) which belongs to me. " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.validator = VALIDATOR;
                        params.owner = OWNER;
                        params.type = BIRTHPLACE;
                        params.secret = SECRET;
                        params.publicKey = PUBLIC_KEY;
                        const body = createAnswerAttributeValidationRequest(params);
                        const response = await utils[request]("POST", "v2/attribute-validations/cancel", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Notarize an IN_PROGRESS validation request (OWNER, EMAIL, VALIDATOR_2) which belongs to me. " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.validator = VALIDATOR_2;
                        params.owner = OWNER;
                        params.type = EMAIL;
                        params.secret = VALIDATOR_SECRET_2;
                        params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                        params.validationType = constants.validationType.FACE_TO_FACE;
                        const body = createAnswerAttributeValidationRequest(params);
                        const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Get the details of a validation request (OWNER, BIRTHPLACE, VALIDATOR) that is CANCELED. " +
                        "EXPECTED : SUCCESS. RESULT : The validation request status is now CANCELED",
                    async () => {
                        const attribute = await utils[request](
                            "GET",
                            "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE,
                        );
                        const response = await utils[request](
                            "GET",
                            "v2/attribute-validations/validationrequest?validator=" +
                                VALIDATOR +
                                "&attributeId=" +
                                attribute.data.attributes[0].id,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data.attribute_validation_requests).toHaveLength(1);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                        expect(response.data.attribute_validation_requests[0].status).toBe(
                            constants.validationRequestStatus.CANCELED,
                        );
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("last_update_timestamp");
                    },
                );

                it(
                    "Get the details of a validation request (OWNER, EMAIL, VALIDATOR_2) that is COMPLETED. " +
                        "EXPECTED : SUCCESS. RESULT : The validation request status is now COMPLETED",
                    async () => {
                        const attribute = await utils[request](
                            "GET",
                            "v2/attributes?owner=" + OWNER + "&type=" + EMAIL,
                        );
                        const response = await utils[request](
                            "GET",
                            "v2/attribute-validations/validationrequest?validator=" +
                                VALIDATOR_2 +
                                "&attributeId=" +
                                attribute.data.attributes[0].id,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data.attribute_validation_requests).toHaveLength(1);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("status");
                        expect(response.data.attribute_validation_requests[0].status).toBe(
                            constants.validationRequestStatus.COMPLETED,
                        );
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("timestamp");
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("last_update_timestamp");
                    },
                );

                it(
                    "Get the details of an attribute (OWNER, EMAIL) that has a notarized validation request. " +
                        "EXPECTED : SUCCESS. RESULT : The attribute is ACTIVE",
                    async () => {
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
                    },
                );

                it(
                    "Reject a validation request (OWNER, PHONE_NUMBER) that is IN_PROGRESS. " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.validator = VALIDATOR;
                        params.owner = OWNER;
                        params.type = PHONE_NUMBER;
                        params.reason = REASON_1024_GOOD;
                        params.secret = VALIDATOR_SECRET;
                        params.publicKey = VALIDATOR_PUBLIC_KEY;
                        const body = createAnswerAttributeValidationRequest(params);
                        const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "Get the details of a validation request (OWNER, PHONE_NUMBER, VALIDATOR) that is REJECTED. " +
                        "EXPECTED : SUCCESS. RESULT : The validation request status is REJECTED and a reason exists for the rejection",
                    async () => {
                        const attribute = await utils[request](
                            "GET",
                            "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER,
                        );
                        const response = await utils[request](
                            "GET",
                            "v2/attribute-validations/validationrequest?validator=" +
                                VALIDATOR +
                                "&attributeId=" +
                                attribute.data.attributes[0].id,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data.attribute_validation_requests).toHaveLength(1);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty("attribute_id");
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty(OWNER_PROP);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty(TYPE_PROP);
                        expect(response.data.attribute_validation_requests[0].status).toBe(
                            constants.validationRequestStatus.REJECTED,
                        );
                        expect(response.data.attribute_validation_requests[0].reason).toBe(REASON_1024_GOOD);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty(TIMESTAMP_PROP);
                        expect(response.data.attribute_validation_requests[0].timestamp).toBeGreaterThanOrEqual(1);
                        expect(response.data.attribute_validation_requests[0]).toHaveProperty(
                            LAST_UPDATE_TIMESTAMP_PROP,
                        );
                        expect(
                            response.data.attribute_validation_requests[0].last_update_timestamp,
                        ).toBeGreaterThanOrEqual(1);
                    },
                );
            },
        );
    });

    describe("Get Identity Use Requests ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Get Identity Use Requests", (header, request) => {
            it(
                "As a PUBLIC user, I want to Get the Identity Use Requests for a given SERVICE name, without mentioning the provider. " +
                    "EXPECTED : FALSE. ERROR : INCORRECT_IDENTITY_USE_PARAMETERS",
                async () => {
                    const response = await utils[request]("GET", "v2/identity-use?xy=zq");
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.error).toBe(messages.INCORRECT_IDENTITY_USE_PARAMETERS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the Identity Use Requests for a given SERVICE that has no requests. " +
                    "EXPECTED : SUCCESS. RESULT : Empty array",
                async () => {
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?serviceName=" + SERVICE_NAME + "&serviceProvider=" + PROVIDER,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(0);
                },
            );

            it(
                "As a PROVIDER, I want to Create an Identity Use Request on behalf of some other user (OWNER). " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_SENDER_IS_NOT_OWNER_ERROR",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_SENDER_IS_NOT_OWNER_ERROR);
                },
            );

            it(
                "As a PROVIDER, I want to Approve an Identity Use Request that does not exist (service exists). " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_MISSING_FOR_ACTION",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE_NAME;
                    params.serviceProvider = PROVIDER;
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_MISSING_FOR_ACTION);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request including an attribute that has just one completed validation, which is " +
                    "insufficient for a service that requires 2 validations. EXPECTED : FAILURE. ERROR : REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(
                        messages.REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE,
                    );
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request including an attribute that has one completed validation and a service " +
                    "that requires one validation. EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE10_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the Identity Use Requests for a given SERVICE and PROVIDER. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Result",
                async () => {
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?serviceName=" + SERVICE10_NAME + "&serviceProvider=" + PROVIDER,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                },
            );

            it(
                "Notarize an IN_PROGRESS validation request (OWNER, EMAIL, VALIDATOR) which belongs to me. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = EMAIL;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    const body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of an attribute which has 2 completed notarizations. " +
                    'EXPECTED : SUCCESS. RESULT : Attribute is active, "completed" property has a value of 2',
                async () => {
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
                    expect(response.data.attributes[0]).toHaveProperty(COMPLETED);
                    expect(response.data.attributes[0].completed).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(EXPIRE_TIMESTAMP_PROP);
                    expect(response.data.attributes[0].expire_timestamp).toBeNull();
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request, having all the required notarizations " +
                    "but failing to provide one of the required service attribute type values (EMAIL). " +
                    "EXPECTED : FAILURE. ERROR : REQUIRED_SERVICE_ATTRIBUTES_VALUES_ARE_MISSING",
                async () => {
                    const param = {} as any;
                    param.owner = OWNER;
                    param.secret = SECRET;
                    param.publicKey = PUBLIC_KEY;
                    param.serviceName = SERVICE10_NAME;
                    param.values = [{ type: FIRST_NAME, value: "HHH" }];
                    const body = createIdentityUseRequest(param);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REQUIRED_SERVICE_ATTRIBUTES_VALUES_ARE_MISSING);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request including an attribute that has 2 completed validations and a service (SERVICE_NAME) " +
                    "that requires 2 validations. EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Create an Identity Use Request including an attribute that has 2 completed validations and a service (SERVICE2_NAME)" +
                    "that requires 2 validations (will be used for Approve + End Request). EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE2_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Create an Identity Use Request including an attribute that has 2 completed validations and a service (SERVICE3_NAME)" +
                    "that requires 2 validations (will be used for Cancel Request). EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE3_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Create an Identity Use Request including an attribute that has 2 completed validations and a service (SERVICE4_NAME)" +
                    "that requires 2 validations (will be used for Decline Request). EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE4_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the Identity Use Requests for a given PROVIDER" +
                    "EXPECTED : SUCCESS. RESULT : 5 results",
                async () => {
                    const response = await utils[request]("GET", "v2/identity-use?serviceProvider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(5);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the Identity Use Requests for a given OWNER" +
                    "EXPECTED : SUCCESS. RESULT : 5 results",
                async () => {
                    const response = await utils[request]("GET", "v2/identity-use?owner=" + OWNER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(5);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of all Identity Use Requests (based on PROVIDER, SERVICE, OWNER). " +
                    "EXPECTED : SUCCESS. RESULT : 1 Result, details include 2 validation requests",
                async () => {
                    const result = await utils[request](
                        "GET",
                        "v2/services?provider=" + PROVIDER + "&name=" + SERVICE_NAME,
                    );
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data).toHaveProperty("validation_requests_count");
                    expect(response.data.validation_requests_count).toBe(2);
                    expect(response.data).toHaveProperty("validation_requests");
                    expect(response.data.validation_requests).toBeArray();
                    expect(response.data.validation_requests.length).toBe(2);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Approve ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Approve Identity Use Request - Approve",
            (header, request) => {
                it(
                    "As an OWNER, I want to Approve my own PENDING_APPROVAL Identity Use Request. " +
                        "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_PROVIDER_ERROR",
                    async () => {
                        const params = {} as any;
                        params.serviceName = SERVICE_NAME;
                        params.serviceProvider = PROVIDER;
                        params.owner = OWNER;
                        params.secret = SECRET;
                        params.publicKey = PUBLIC_KEY;
                        const body = createAnswerIdentityUseRequest(params);
                        const response = await utils[request]("POST", "v2/identity-use/approve", body);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(FALSE);
                        expect(response.data.error).toBe(
                            messages.IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_PROVIDER_ERROR,
                        );
                    },
                );

                it(
                    "As a PROVIDER, I want to Approve a PENDING_APPROVAL Identity Use Request. " +
                        "EXPECTED : SUCCESS. RESULT : Transaction ID",
                    async () => {
                        const params = {} as any;
                        params.serviceName = SERVICE_NAME;
                        params.serviceProvider = PROVIDER;
                        params.owner = OWNER;
                        params.secret = PROVIDER_SECRET;
                        params.publicKey = PROVIDER_PUBLIC_KEY;
                        const body = createAnswerIdentityUseRequest(params);
                        const response = await utils[request]("POST", "v2/identity-use/approve", body);
                        sleep.msleep(SLEEP_TIME);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty(TRANSACTION_ID);
                    },
                );

                it(
                    "As a PUBLIC user, I want to Get the details of an ACTIVE Identity Use Request (based on SERVICE and OWNER). " +
                        "EXPECTED : SUCCESS. RESULT : 1 Identity Use Request Result (ACTIVE)",
                    async () => {
                        const result = await utils[request](
                            "GET",
                            "v2/services?provider=" + PROVIDER + "&name=" + SERVICE_NAME,
                        );
                        const response = await utils[request](
                            "GET",
                            "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                        );
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(TRUE);
                        expect(response.data).toHaveProperty("identity_use_requests");
                        expect(response.data.identity_use_requests).toBeArray();
                        expect(response.data.identity_use_requests.length).toBe(1);
                        expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                        expect(response.data.identity_use_requests[0].status).toBe(
                            constants.identityUseRequestStatus.ACTIVE,
                        );
                    },
                );

                it(
                    "As an OWNER, I want to Create an Identity Use Request for a service that already has an approved identity use request" +
                        "EXPECTED : FAILURE. ERROR : ACTIVE_IDENTITY_USE_REQUEST_ALREADY_EXISTS",
                    async () => {
                        const params = {} as any;
                        params.owner = OWNER;
                        params.secret = SECRET;
                        params.publicKey = PUBLIC_KEY;
                        params.serviceName = SERVICE_NAME;
                        params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                        const body = createIdentityUseRequest(params);
                        const response = await utils[request]("POST", "v2/identity-use", body);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(FALSE);
                        expect(response.data.error).toBe(messages.ACTIVE_IDENTITY_USE_REQUEST_ALREADY_EXISTS);
                    },
                );

                it(
                    "As a PROVIDER, I want to Approve an Identity Use Request which is already ACTIVE. " +
                        "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL",
                    async () => {
                        const params = {} as any;
                        params.serviceName = SERVICE_NAME;
                        params.serviceProvider = PROVIDER;
                        params.owner = OWNER;
                        params.secret = PROVIDER_SECRET;
                        params.publicKey = PROVIDER_PUBLIC_KEY;
                        const body = createAnswerIdentityUseRequest(params);
                        const response = await utils[request]("POST", "v2/identity-use/approve", body);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(FALSE);
                        expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL);
                    },
                );

                it(
                    "As a PROVIDER, I want to Decline an Identity Use Request which is already ACTIVE. " +
                        "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL",
                    async () => {
                        const params = {} as any;
                        params.serviceName = SERVICE_NAME;
                        params.serviceProvider = PROVIDER;
                        params.owner = OWNER;
                        params.secret = PROVIDER_SECRET;
                        params.publicKey = PROVIDER_PUBLIC_KEY;
                        params.reason = REASON_1024_GOOD;
                        const body = createAnswerIdentityUseRequest(params);
                        const response = await utils[request]("POST", "v2/identity-use/decline", body);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(FALSE);
                        expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL);
                    },
                );

                it(
                    "As an OWNER, I want to Cancel an Identity Use Request which is already ACTIVE. " +
                        "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL",
                    async () => {
                        const params = {} as any;
                        params.serviceName = SERVICE_NAME;
                        params.serviceProvider = PROVIDER;
                        params.owner = OWNER;
                        params.secret = SECRET;
                        params.publicKey = PUBLIC_KEY;
                        const body = createAnswerIdentityUseRequest(params);
                        const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                        expect(response.data).toHaveProperty(SUCCESS);
                        expect(response.data.success).toBe(FALSE);
                        expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_NOT_PENDING_APPROVAL);
                    },
                );
            },
        );
    });

    describe("Identity Use Requests Actions - End ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("End Identity Use Request", (header, request) => {
            it(
                "As an OWNER, I want to End an Identity Use Request which is still PENDING_APPROVAL. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_NOT_ACTIVE",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_NOT_ACTIVE);
                },
            );

            it(
                "Approve an Identity Use Request which is in PENDING_APPROVAL status (to be used later by END Request action). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PROVIDER, I want to End an ACTIVE Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_OWNER_ERROR",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_OWNER_ERROR);
                },
            );

            it(
                "As an OWNER, I want to End an ACTIVE Identity Use Request, without providing a reason. " +
                    "EXPECTED : FAILURE. ERROR : END_IDENTITY_USE_REQUEST_NO_REASON",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.END_IDENTITY_USE_REQUEST_NO_REASON);
                },
            );

            it(
                "As an OWNER, I want to End an ACTIVE Identity Use Request, by providing a reason that is too long. " +
                    "EXPECTED : FAILURE. ERROR : REASON_TOO_BIG",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1025_TOO_LONG;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REASON_TOO_BIG);
                },
            );

            it(
                "As an OWNER, I want to End an ACTIVE Identity Use Request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of an ENDED Identity Use Request (based on SERVICE and OWNER). " +
                    "EXPECTED : SUCCESS. RESULT : 1 request, in ENDED status",
                async () => {
                    const result = await utils[request](
                        "GET",
                        "v2/services?provider=" + PROVIDER + "&name=" + SERVICE2_NAME,
                    );
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                    expect(response.data.identity_use_requests[0].status).toBe(
                        constants.identityUseRequestStatus.ENDED,
                    );
                },
            );

            it(
                "As a PROVIDER, I want to Approve an already ENDED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ENDED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ENDED_NO_ACTION);
                },
            );

            it(
                "As a PROVIDER, I want to Decline an already ENDED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ENDED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ENDED_NO_ACTION);
                },
            );

            it(
                "As an OWNER, I want to Cancel an already ENDED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ENDED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ENDED_NO_ACTION);
                },
            );

            it(
                "As an OWNER, I want to End an already ENDED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ENDED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ENDED_NO_ACTION);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Decline ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Decline Identity Use Request", (header, request) => {
            it(
                "As an OWNER, I want to Decline a PENDING_APPROVAL Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_PROVIDER_ERROR",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_PROVIDER_ERROR);
                },
            );

            it(
                "As an PROVIDER, I want to Decline a PENDING_APPROVAL Identity Use Request, without providing a reason. " +
                    "EXPECTED : FAILURE. ERROR : DECLINE_IDENTITY_USE_REQUEST_NO_REASON",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.DECLINE_IDENTITY_USE_REQUEST_NO_REASON);
                },
            );

            it(
                "As an PROVIDER, I want to Decline a PENDING_APPROVAL Identity Use Request, by providing a reason that is too long. " +
                    "EXPECTED : FAILURE. ERROR : REASON_TOO_BIG",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1025_TOO_LONG;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REASON_TOO_BIG);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of a PENDING_APPROVAL Identity Use Request, which was incorrectly declined several times. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Identity Use Request, in PENDING_APPROVAL status",
                async () => {
                    const result = await utils[request](
                        "GET",
                        "v2/services?provider=" + PROVIDER + "&name=" + SERVICE3_NAME,
                    );
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                    expect(response.data.identity_use_requests[0].status).toBe(
                        constants.identityUseRequestStatus.PENDING_APPROVAL,
                    );
                },
            );

            it(
                "As a PROVIDER, I want to Decline a PENDING_APPROVAL Identity Use Request, providing a correct reason for this action. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of a DECLINED Identity Use Request. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Identity Use Request, in DECLINED status",
                async () => {
                    const result = await utils[request](
                        "GET",
                        "v2/services?provider=" + PROVIDER + "&name=" + SERVICE3_NAME,
                    );
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                    expect(response.data.identity_use_requests[0].status).toBe(
                        constants.identityUseRequestStatus.DECLINED,
                    );
                },
            );

            it(
                "As a PROVIDER, I want to Decline a DECLINED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_DECLINED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_DECLINED_NO_ACTION);
                },
            );

            it(
                "As a PROVIDER, I want to Approve a DECLINED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_DECLINED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_DECLINED_NO_ACTION);
                },
            );

            it(
                "As an OWNER, I want to Cancel a DECLINED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_DECLINED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_DECLINED_NO_ACTION);
                },
            );

            it(
                "As an OWNER, I want to End a DECLINED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_DECLINED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE3_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_DECLINED_NO_ACTION);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Cancel ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Cancel Identity Use Request", (header, request) => {
            it(
                "As a PROVIDER, I want to Cancel a PENDING_APPROVAL Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_OWNER_ERROR",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE4_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ANSWER_SENDER_IS_NOT_OWNER_ERROR);
                },
            );

            it(
                "As an OWNER, I want to Cancel a PENDING_APPROVAL Identity Use Request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE4_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of a CANCELED Identity Use Request. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Identity Use Request, in CANCELED status",
                async () => {
                    const result = await utils[request](
                        "GET",
                        "v2/services?provider=" + PROVIDER + "&name=" + SERVICE4_NAME,
                    );
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                    expect(response.data.identity_use_requests[0].status).toBe(
                        constants.identityUseRequestStatus.CANCELED,
                    );
                },
            );

            it(
                "As a PROVIDER, I want to Decline a CANCELED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_CANCELED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE4_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_CANCELED_NO_ACTION);
                },
            );

            it(
                "As a PROVIDER, I want to Approve a CANCELED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_CANCELED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE4_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_CANCELED_NO_ACTION);
                },
            );

            it(
                "As an OWNER, I want to Cancel a CANCELED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_DECLINED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE4_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_CANCELED_NO_ACTION);
                },
            );

            it(
                "As an OWNER, I want to End a CANCELED Identity Use Request. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_DECLINED_NO_ACTION",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE4_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_CANCELED_NO_ACTION);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Already existing requests ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Cancel Identity Use Request", (header, request) => {
            it(
                "As an OWNER, I want to Create an Identity Use Request for a service that already has an ended request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE2_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request for a service that already has a declined request. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE3_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request for a service that already has a canceled request (to be used on CANCEL on INACTIVE). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE4_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request for a service that already has a pending approval request. " +
                    "EXPECTED : FAILURE. ERROR : PENDING_APPROVAL_IDENTITY_USE_REQUEST_ALREADY_EXISTS",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE2_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.PENDING_APPROVAL_IDENTITY_USE_REQUEST_ALREADY_EXISTS);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Using an inactive service ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Inactivation service actions", (header, request) => {
            // Inactivate Fifth Service ( for CREATE action )

            it("Inactivate one of my ACTIVE services. " + "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                const param = {} as any;
                param.name = SERVICE5_NAME;
                param.provider = PROVIDER;
                param.secret = PROVIDER_SECRET;
                param.publicKey = PROVIDER_PUBLIC_KEY;
                const body = serviceRequestAction(param);
                const response = await utils[request]("PUT", "v2/services/inactivate", body);
                sleep.msleep(SLEEP_TIME);
                expect(response.data).toHaveProperty(SUCCESS);
                expect(response.data.success).toBe(TRUE);
                expect(response.data).toHaveProperty(TRANSACTION_ID);
            });

            it(
                "Get the details of an INACTIVE service (based on the service name). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with INACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE5_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.INACTIVE);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request, having all the required notarizations, but for an INACTIVE service. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_FOR_INACTIVE_SERVICE",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE5_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_FOR_INACTIVE_SERVICE);
                },
            );

            // Inactivate Sixth Service ( for APPROVE action )

            it(
                "Create an Identity Use Request, having all the required notarizations (to be used for APPROVE on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE6_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Inactivate one of my ACTIVE services (to be used for APPROVE on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE6_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of an INACTIVE service (based on the service name). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with INACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE6_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.INACTIVE);
                },
            );

            it(
                "As a PROVIDER, I want to Approve an Identity Use Request made on a Service that has since been Inactivated. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE6_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE);
                },
            );

            // Inactivate Seventh Service ( for END action )

            it(
                "Create an Identity Use Request, having all the required notarizations (to be used for END on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE7_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Approve an Identity Use Request (to be used for END on INACTIVE service). " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE7_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Inactivate one of my ACTIVE services (to be used for END on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE7_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of an INACTIVE service (based on the service name). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with INACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE7_NAME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.INACTIVE);
                },
            );

            it(
                "As an OWNER, I want to End an Identity Use Request made on a Service that has since been Inactivated. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE7_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE);
                },
            );

            // Inactivate Eighth Service ( for DECLINE actions )

            it(
                "Create an Identity Use Request, having all the required notarizations (to be used for DECLINE on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE8_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Inactivate one of my ACTIVE services (to be used for DECLINE on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE8_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of an INACTIVE service (based on the service name). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with INACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE8_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.INACTIVE);
                },
            );

            it(
                "As a PROVIDER, I want to Decline an Identity Use Request made on a Service that has since been Inactivated. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE8_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE);
                },
            );

            // Inactivate Ninth Service ( for CANCEL actions )

            it(
                "Create an Identity Use Request, having all the required notarizations (to be used for CANCEL on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE9_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Inactivate one of my ACTIVE services (to be used for CANCEL on INACTIVE service). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE9_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of an INACTIVE service (based on the service name). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with INACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE9_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.INACTIVE);
                },
            );

            it(
                "As an OWNER, I want to Cancel an Identity Use Request made on a Service that has since been Inactivated. " +
                    "EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE9_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_ACTION_FOR_INACTIVE_SERVICE);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Using a reactivated service ", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Activation service actions", (header, request) => {
            // Activate Fifth Service ( for CREATE action )

            it(
                "Activate one of my INACTIVE services (to be used for creating an Identity Use on a recently Activated service) . " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE5_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As an OWNER, I want to Create an Identity Use Request, having all the required notarizations, for a recently Activated service. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE5_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            // Activate Sixth Service ( for APPROVE action )

            it(
                "Activate one of my INACTIVE services (to be used for APPROVE on ACTIVATED service) . " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE6_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of a recently Activated service (to be used for APPROVE). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with ACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE6_NAME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.ACTIVE);
                },
            );

            it(
                "As a PROVIDER, I want to Approve an Identity Use Request made on a Service that has since been Inactivated and then Activated again. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE6_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            // Activate Seventh Service ( for END action )

            it(
                "Activate one of my INACTIVE services (to be used for END on ACTIVATED service ) . " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE7_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of a recently Activated service (to be used for END). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with ACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE7_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.ACTIVE);
                },
            );

            it(
                "As an OWNER, I want to End an Identity Use Request made on a Service that has since been Inactivated and then Activated again. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE7_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            // Activate Eighth Service ( for DECLINE action )

            it(
                "Activate one of my INACTIVE services (to be used for DECLINE on ACTIVATED service ) . " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE8_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of a recently Activated service (to be used for DECLINE). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with ACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE8_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.ACTIVE);
                },
            );

            it(
                "As a PROVIDER, I want to Decline an Identity Use Request made on a Service that has since been Inactivated and then Activated again. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE8_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            // Activate Ninth Service ( for CANCEL action )

            it(
                "Activate one of my INACTIVE services (to be used for DECLINE on ACTIVATED service ) . " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE9_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of a recently Activated service (to be used for DECLINE). " +
                    "EXPECTED : SUCCESS. RESULT : 1 service, with ACTIVE status",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE9_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.ACTIVE);
                },
            );

            it(
                "As an OWNER, I want to Cancel an Identity Use Request made on a Service that has since been Inactivated and then Activated again. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.serviceName = SERVICE9_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );
        });
    });

    describe("Identity Use Requests Actions - Service does not exist", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Activation service actions", (header, request) => {
            it(
                "As an OWNER, I want to Create an Identity Use Request using a service that does not exist " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = NON_EXISTING_SERVICE;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );

            it(
                "As a PROVIDER, I want to Approve an Identity Use Request using a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND",
                async () => {
                    const params = {} as any;
                    params.serviceName = NON_EXISTING_SERVICE;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );

            it(
                "As an OWNER, I want to End an Identity Use Request using a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND",
                async () => {
                    const params = {} as any;
                    params.serviceName = NON_EXISTING_SERVICE;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );

            it(
                "As a PROVIDER, I want to Decline an Identity Use Request using a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND",
                async () => {
                    const params = {} as any;
                    params.serviceName = NON_EXISTING_SERVICE;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );

            it(
                "As an OWNER, I want to Cancel an Identity Use Request using a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND",
                async () => {
                    const params = {} as any;
                    params.serviceName = NON_EXISTING_SERVICE;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    const body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );
        });
    });

    describe("Identity Use Requests - Service requires multiple attribute types and multiple validations", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Activation service actions", (header, request) => {
            it(
                "Create a service with 2 attribute types, which will require 2 validations per attribute. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    param.attribute_types = [EMAIL, SSN];
                    param.name = SERVICE11_NAME;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "As an OWNER, I want to create an Identity Use Request for a service that requires 2 attributes and 2 validations, " +
                    "only one of which exists and is validated twice. " +
                    "EXPECTED : FAILURE. ERROR : REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE11_NAME;
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING);
                },
            );

            it(
                "Create a non file attribute (OWNER, SSN). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.value = SSN_VALUE;
                    param.type = SSN;
                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "As an OWNER, I want to create an Identity Use Request for a service that requires 2 attributes and 2 validations, " +
                    "both of the attributes exist, but only one of them is validated twice. " +
                    "EXPECTED : FAILURE. ERROR : REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE11_NAME;
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(
                        messages.REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE,
                    );
                },
            );

            it(
                "Create an attribute validation request for the SSN attribute. " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = SSN;
                    const body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Approve a PENDING_APPROVAL validation request (OWNER, SSN, VALIDATOR). " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = SSN;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    const body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Notarize an IN_PROGRESS validation request (OWNER, SSN, VALIDATOR) which belongs to me. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = SSN;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    const body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As an OWNER, I want to create an Identity Use Request for a service that requires 2 attributes and 2 validations, " +
                    "both of the attributes exist, but only one of them is validated twice, the other being validated only once. " +
                    "EXPECTED : FAILURE. ERROR : REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE11_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }, { type: SSN, value: "ssn" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(
                        messages.REQUIRED_SERVICE_ATTRIBUTES_ARE_MISSING_EXPIRED_OR_INACTIVE,
                    );
                },
            );

            it(
                "Create an attribute validation request for the SSN attribute. " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.validator = VALIDATOR_2;
                    params.type = SSN;
                    const body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Approve a PENDING_APPROVAL validation request (OWNER, SSN, VALIDATOR_2). " +
                    "EXPECTED : SUCCESS, RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = SSN;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    const body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Notarize an IN_PROGRESS validation request (OWNER, SSN, VALIDATOR_2) which belongs to me. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = SSN;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    const body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As an OWNER, I want to create an Identity Use Request for a service that requires 2 attributes and 2 validations, " +
                    "both of the attributes exist, and both are notarized twice. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const params = {} as any;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE11_NAME;
                    params.values = [{ type: EMAIL, value: "a@yahoo.com" }, { type: SSN, value: "ssn" }];
                    const body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of an Identity Use Request that requires 2 attributes and 2 validations per attribute. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Result, details include 4 validation requests",
                async () => {
                    const result = await utils[request](
                        "GET",
                        "v2/services?provider=" + PROVIDER + "&name=" + SERVICE11_NAME,
                    );
                    const response = await utils[request](
                        "GET",
                        "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data).toHaveProperty("validation_requests_count");
                    expect(response.data.validation_requests_count).toBe(4); // at this point, 2 validation are completed for the email, and 2 for SSN
                    expect(response.data).toHaveProperty("validation_requests");
                    expect(response.data.validation_requests).toBeArray();
                    expect(response.data.validation_requests.length).toBe(4);
                },
            );
        });
    });
});

function createAttributeBody(param) {
    const request = {} as any;
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
    const request = {} as any;
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

function createIdentityUseRequest(param) {
    const request = {} as any;
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.identityuse = [];
    request.asset.identityuse[0] = {};
    request.asset.identityuse[0].owner = param.owner ? param.owner : OWNER;
    request.asset.identityuse[0].serviceName = param.serviceName ? param.serviceName : SERVICE_NAME;
    request.asset.identityuse[0].serviceProvider = param.serviceProvider ? param.serviceProvider : PROVIDER;
    request.asset.identityuse[0].attributes = param.values ? param.values : [{ type: IDENTITY_CARD, value: "HHH" }];

    console.log(request);
    return request;
}

function createAnswerAttributeValidationRequest(param) {
    const request = {} as any;
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

function createAnswerIdentityUseRequest(param) {
    const request = {} as any;
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.identityuse = [];
    request.asset.identityuse[0] = {};
    request.asset.identityuse[0].owner = param.owner ? param.owner : OWNER;
    request.asset.identityuse[0].serviceName = param.serviceName ? param.serviceName : SERVICE_NAME;
    request.asset.identityuse[0].serviceProvider = param.serviceProvider ? param.serviceProvider : PROVIDER;
    if (param.reason) {
        request.asset.identityuse[0].reason = param.reason;
    }

    console.log(request);
    return request;
}

function createServiceRequest(param) {
    const request = {} as any;
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

function serviceRequestAction(param) {
    const request = {} as any;
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : PROVIDER_SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PROVIDER_PUBLIC_KEY;
    request.asset = {};
    request.asset.service = {};
    request.asset.service.name = param.name ? param.name : SERVICE_NAME;
    request.asset.service.provider = param.provider ? param.provider : PROVIDER;
    console.log(JSON.stringify(request));
    return request;
}
