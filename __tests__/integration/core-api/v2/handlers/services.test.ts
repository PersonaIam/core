// import "@arkecosystem/core-test-utils";
import sleep from "sleep";
import { constants } from "../../../../../packages/core-api/src/versions/2/constants";
import { messages } from "../../../../../packages/core-api/src/versions/2/messages";
import { delegates } from "../data";
import { secrets } from "../data";
import { utils } from "../utils";

const SUCCESS = "success";
const TRANSACTION_ID = "transactionId";
const FALSE = false;
const TRUE = true;
const ERROR = "error";
const SERVICES = "services";
const SERVICE_ATTRIBUTE_TYPES = "service_attribute_types";
const SLEEP_TIME = 7001;

// DATA

const DESCRIPTION = "description";
const CUSTOM_VALIDATIONS = 2;
const SERVICE_NAME = "Ada";
const SERVICE2_NAME = "Anabella";
const NON_EXISTING_SERVICE = "Ursula";

// Actors

// const OWNER = delegates[10].senderId;
const SECRET = secrets[10];
const PUBLIC_KEY = delegates[10].senderPublicKey;

const PROVIDER = delegates[11].senderId;
const PROVIDER_SECRET = secrets[11];
const PROVIDER_PUBLIC_KEY = delegates[11].senderPublicKey;

const BIRTHPLACE = "birthplace";
const ADDRESS = "address";
const INCORRECT_ADDRESS = "ABC";

const maxLength = 128;
const descriptionMaxLength = new Array(1 + maxLength).join("x");
const descriptionTooLong = new Array(1 + maxLength + 1).join("x");

describe("API 2.0", () => {
    describe("Create & Get Services", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Get Services", (header, request) => {
            it(
                "As a PUBLIC user, I want to Get the services, by supplying an invalid provider address. " +
                    "EXPECTED : FAILURE. ERROR : INVALID_PROVIDER_ADDRESS",
                async () => {
                    const response = await utils[request]("GET", "v2/services?provider=" + INCORRECT_ADDRESS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.INVALID_PROVIDER_ADDRESS);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services when there are none in the system. " +
                    'EXPECTED : SUCCESS. RESULT : "services" result',
                async () => {
                    const response = await utils[request]("GET", "v2/services/list");

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services for a provider with no services. " +
                    'EXPECTED : SUCCESS. RESULT : Empty "services" List',
                async () => {
                    const response = await utils[request]("GET", "v2/services?provider=" + PROVIDER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services).toBeArray();
                    expect(response.data.services.length).toBe(0);
                },
            );

            it(
                "As a PROVIDER, I want to Create a new Service without specifying any description. " +
                    "EXPECTED : FAILURE. ERROR : MISSING_SERVICE_DESCRIPTION",
                async () => {
                    const param = {} as any;
                    param.attribute_types = "birthplace";
                    param.validations_required = 1;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.MISSING_SERVICE_DESCRIPTION);
                },
            );

            it(
                "As a PROVIDER, I want to Create a new Service without specifying any attribute types. " +
                    "EXPECTED : FAILURE. ERROR : MISSING_ATTRIBUTE_TYPES",
                async () => {
                    const param = {} as any;
                    param.description = DESCRIPTION;
                    param.validations_required = 1;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.MISSING_ATTRIBUTE_TYPES);
                },
            );

            it(
                "As a PROVIDER, I want to Create a new Service without specifying the number of validations required. " +
                    "EXPECTED : FAILURE. ERROR : MISSING_NUMBER_OF_VALIDATIONS_REQUIRED",
                async () => {
                    const param = {} as any;
                    param.description = DESCRIPTION;
                    param.attribute_types = "identity_card";
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.MISSING_NUMBER_OF_VALIDATIONS_REQUIRED);
                },
            );

            it(
                "As a PROVIDER, I want to Create a new Service successfully. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = BIRTHPLACE;
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
                "As a PROVIDER, I want to Create a Service which already exists. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_ALREADY_EXISTS",
                async () => {
                    const param = {} as any;
                    param.attribute_types = BIRTHPLACE;
                    param.description = DESCRIPTION;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_ALREADY_EXISTS);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services which belong to a given provider (1 Result). " +
                    'EXPECTED : SUCCESS. RESULT : "services" list with 1 element',
                async () => {
                    const response = await utils[request]("GET", "v2/services?provider=" + PROVIDER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(1);
                },
            );

            it(
                "As a PROVIDER, I want to Create a new Service, with a description that is too long. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_DESCRIPTION_TOO_LONG",
                async () => {
                    const param = {} as any;
                    param.attribute_types = ADDRESS;
                    param.description = descriptionTooLong;
                    param.validations_required = CUSTOM_VALIDATIONS;
                    param.name = SERVICE2_NAME;
                    const body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_DESCRIPTION_TOO_LONG);
                },
            );

            it(
                "As a PROVIDER, I want to Create a new Service, with a description that is of maximum length. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.attribute_types = ADDRESS;
                    param.description = descriptionMaxLength;
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
                "Get the List of Services which belong to a given provider (multiple results). " +
                    'EXPECTED : SUCCESS. RESULT : "services" list with 2 elements',
                async () => {
                    const response = await utils[request]("GET", "v2/services?provider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(2);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services that have a given name. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Service",
                async () => {
                    const response = await utils[request]("GET", "v2/services?name=" + SERVICE2_NAME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBeGreaterThanOrEqual(1);
                    expect(response.data.services[0].name).toBe(SERVICE2_NAME);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services that are active. " +
                    "EXPECTED : SUCCESS. RESULT : 2 results",
                async () => {
                    const response = await utils[request]("GET", "v2/services?status=ACTIVE");
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBeGreaterThanOrEqual(2);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services that are active for a given provider. " +
                    "EXPECTED : SUCCESS. RESULT : 2 results",
                async () => {
                    const response = await utils[request]("GET", "v2/services?status=ACTIVE&provider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(2);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the Attribute Types for a given service. " +
                    "EXPECTED : SUCCESS. RESULT : 1 Result (BIRTHPLACE)",
                async () => {
                    const response = await utils[request](
                        "GET",
                        "v2/services/attributeTypes?name=" + SERVICE_NAME + "&provider=" + PROVIDER,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICE_ATTRIBUTE_TYPES);
                    expect(response.data.service_attribute_types).toBe(BIRTHPLACE);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the Attribute Types for a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND",
                async () => {
                    const response = await utils[request](
                        "GET",
                        "v2/services/attributeTypes?name=" + NON_EXISTING_SERVICE + "&provider=" + PROVIDER,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );
        });
    });

    describe("Activate/Inactivate Service", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Activate/Inactivate Service", (header, request) => {
            // service inactivation

            it(
                "As an OWNER, I want to Inactivate an active service that belongs to someone else. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_ACTION_SENDER_IS_NOT_PROVIDER_ERROR",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE_NAME;
                    param.provider = PROVIDER;
                    param.secret = SECRET;
                    param.publicKey = PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_ACTION_SENDER_IS_NOT_PROVIDER_ERROR);
                },
            );

            it(
                "As a PROVIDER, I want to Inactivate one of my services. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE_NAME;
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
                "As a PUBLIC user, I want to Get the List of Services that are active for a given provider. " +
                    "EXPECTED : SUCCESS. RESULT : 1 result",
                async () => {
                    const response = await utils[request]("GET", "v2/services?status=ACTIVE&provider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(1);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of a service, based on name and provider. " +
                    "EXPECTED : SUCCESS. RESULT : 1 result, with status inactive",
                async () => {
                    const response = await utils[request](
                        "GET",
                        "v2/services?name=" + SERVICE_NAME + "&provider=" + PROVIDER,
                    );
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services[0].status).toBe(constants.serviceStatus.INACTIVE);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the List of Services that are active for a given provider. " +
                    "EXPECTED : SUCCESS. RESULT : services array with 1 element",
                async () => {
                    const response = await utils[request]("GET", "v2/services?status=INACTIVE&provider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(1);
                },
            );

            it(
                "As a PROVIDER, I want to Inactivate a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND ",
                async () => {
                    const param = {} as any;
                    param.name = NON_EXISTING_SERVICE;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );

            it(
                "As a PROVIDER, I want to Inactivate a service that is already inactive. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_IS_ALREADY_INACTIVE ",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/inactivate", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_IS_ALREADY_INACTIVE);
                },
            );

            // service activation

            it(
                "As an OWNER, I want to Activate an inactive service that belongs to someone else. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_ACTION_SENDER_IS_NOT_PROVIDER_ERROR",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE_NAME;
                    param.provider = PROVIDER;
                    param.secret = SECRET;
                    param.publicKey = PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_ACTION_SENDER_IS_NOT_PROVIDER_ERROR);
                },
            );

            it(
                "As a PROVIDER, I want to Activate one of my services. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE_NAME;
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
                "As a PROVIDER, I want to Inactivate a service that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_NOT_FOUND ",
                async () => {
                    const param = {} as any;
                    param.name = NON_EXISTING_SERVICE;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_NOT_FOUND);
                },
            );

            it(
                "As a PROVIDER, I want to Activate a service that is already active. " +
                    "EXPECTED : FAILURE. ERROR : SERVICE_IS_ALREADY_ACTIVE ",
                async () => {
                    const param = {} as any;
                    param.name = SERVICE2_NAME;
                    param.provider = PROVIDER;
                    param.secret = PROVIDER_SECRET;
                    param.publicKey = PROVIDER_PUBLIC_KEY;
                    const body = serviceRequestAction(param);
                    const response = await utils[request]("PUT", "v2/services/activate", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SERVICE_IS_ALREADY_ACTIVE);
                },
            );

            it(
                "Get the List of Services that are active for a given provider. " +
                    'EXPECTED : SUCCESS. RESULT : "services" array with 2 elements',
                async () => {
                    const response = await utils[request]("GET", "v2/services?status=ACTIVE&provider=" + PROVIDER);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(SERVICES);
                    expect(response.data.services.length).toBe(2);
                },
            );
        });
    });
});
// tslint:disable-next-line:only-arrow-functions
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
    request.asset.service.provider = param.provider ? param.provider : PROVIDER;
    if (param.description) {
        request.asset.service.description = param.description;
    }
    if (param.validations_required) {
        request.asset.service.validations_required = param.validations_required;
    }
    if (param.attribute_types) {
        request.asset.service.attribute_types = param.attribute_types;
    }

    console.log(JSON.stringify(request));
    return request;
}
// tslint:disable-next-line:only-arrow-functions
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
