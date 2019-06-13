import "@arkecosystem/core-test-utils";
import { utils } from "../utils";
import sleep from "sleep";
import { messages } from "../../../src/versions/2/messages";
import { delegates } from "../data";
import { secrets } from "../data";
import { constants } from "../../../src/versions/2/constants";

const ATTRIBUTES = "attributes";
const SUCCESS = "success";
const TRANSACTION_ID = "transactionId";
const FALSE = false;
const TRUE = true;
const ACTIVE = "active";
const OWNER_PROP = "owner";
const TYPE_PROP = "type";
const VALUE_PROP = "value";
const RED_FLAGS = "redFlags";
const YELLOW_FLAGS = "yellowFlags";
const REJECTED = "rejected";
const DANGER_OF_REJECTION = "dangerOfRejection";

const SLEEP_TIME = 7001;
const ATTRIBUTE_VALIDATION_REQUESTS = "attribute_validation_requests";

// DATA

const DESCRIPTION = "description";
const SERVICE_NAME = "Ada";
const SERVICE2_NAME = "Anabella";
const DESCRIPTION_VALUE = "Modus";

// Actors

const OWNER = delegates[12].senderId;
const SECRET = secrets[12];
const PUBLIC_KEY = delegates[12].senderPublicKey;

const VALIDATOR = delegates[13].senderId;
const VALIDATOR_SECRET = secrets[13];
const VALIDATOR_PUBLIC_KEY = delegates[13].senderPublicKey;

const VALIDATOR_2 = delegates[14].senderId;
const VALIDATOR_SECRET_2 = secrets[14];
const VALIDATOR_PUBLIC_KEY_2 = delegates[14].senderPublicKey;

const VALIDATOR_3 = delegates[15].senderId;
const VALIDATOR_SECRET_3 = secrets[15];
const VALIDATOR_PUBLIC_KEY_3 = delegates[15].senderPublicKey;

const VALIDATOR_4 = delegates[16].senderId;
const VALIDATOR_SECRET_4 = secrets[16];
const VALIDATOR_PUBLIC_KEY_4 = delegates[16].senderPublicKey;

const VALIDATOR_5 = delegates[17].senderId;
const VALIDATOR_SECRET_5 = secrets[17];
const VALIDATOR_PUBLIC_KEY_5 = delegates[17].senderPublicKey;

const VALIDATOR_6 = delegates[18].senderId;
const VALIDATOR_SECRET_6 = secrets[18];
const VALIDATOR_PUBLIC_KEY_6 = delegates[18].senderPublicKey;

const VALIDATOR_7 = delegates[19].senderId;
const VALIDATOR_SECRET_7 = secrets[19];
const VALIDATOR_PUBLIC_KEY_7 = delegates[19].senderPublicKey;

const VALIDATOR_8 = delegates[20].senderId;
const VALIDATOR_SECRET_8 = secrets[20];
const VALIDATOR_PUBLIC_KEY_8 = delegates[20].senderPublicKey;


const PROVIDER = delegates[21].senderId;
const PROVIDER_SECRET = secrets[21];
const PROVIDER_PUBLIC_KEY = delegates[21].senderPublicKey;

const LAST_NAME = "last_name";
const LAST_NAME_VALUE = "Dumars";
const PHONE_NUMBER = "phone_number";
const PHONE_NUMBER_VALUE = "345654321";
const BIRTHPLACE = "birthplace";
const BIRTHPLACE_VALUE = "Calgary";
const NEW_BIRTHPLACE_VALUE = "Winnipeg";
const ALIAS = "alias";
const ALIAS_VALUE = "fluffy";
const NEW_ALIAS_VALUE = "cozy";


const IDENTITY_CARD = "identity_card";

let maxLength = 1024;
let REASON_1024_GOOD = new Array(1 + maxLength).join("x");

const CUSTOM_VALIDATIONS = 2;
const ONE_VALIDATION = 1;


describe("API 2.0", () => {

    describe('Preparations - Create Attributes & Services', () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Create Attributes & Services",
            (header, request) => {

                it("Create an attribute (OWNER, LAST_NAME). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.value = LAST_NAME_VALUE;
                    param.type = LAST_NAME;
                    let body = createAttributeBody(<any>{});
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it("Create an attribute (OWNER, PHONE_NUMBER). " +
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

                it("Create an attribute (OWNER, BIRTHPLACE). " +
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

                it("Create an attribute (OWNER, ALIAS). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                    let param = <any>{};
                    param.value = ALIAS_VALUE;
                    param.type = ALIAS;
                    let body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it('As a PROVIDER, I want to Create a new Service based on PHONE_NUMBER. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let param = <any>{};
                    param.attribute_types = [PHONE_NUMBER];
                    param.description = DESCRIPTION;
                    param.validations = ONE_VALIDATION;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

                it('As a PROVIDER, I want to Create a new Service based on BIRTHPLACE. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let param = <any>{};
                    param.name = SERVICE2_NAME;
                    param.attribute_types = [BIRTHPLACE];
                    param.description = DESCRIPTION;
                    param.validations = ONE_VALIDATION;
                    let body = createServiceRequest(param);
                    const response = await utils[request]("POST", "v2/services", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                });

            });
    });

    describe('Use Case #1 : NNRRR - 2 Notarizations followed by 3 Rejections', function () {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Use Case #1 : NNRRR - 2 Notarizations followed by 3 Rejections",
            (header, request) => {

                it('Create a validation request (BIRTHPLACE, VALIDATOR). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

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

                it('Approve a validation request (BIRTHPLACE, VALIDATOR) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (BIRTHPLACE, VALIDATOR_2). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_2;
                    params.type = BIRTHPLACE;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (BIRTHPLACE, VALIDATOR_2) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (BIRTHPLACE, VALIDATOR_3). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_3;
                    params.type = BIRTHPLACE;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (BIRTHPLACE, VALIDATOR_3) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (BIRTHPLACE, VALIDATOR_4). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_4;
                    params.type = BIRTHPLACE;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (BIRTHPLACE, VALIDATOR_4) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (BIRTHPLACE, VALIDATOR_5). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_5;
                    params.type = BIRTHPLACE;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (BIRTHPLACE, VALIDATOR_5) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (BIRTHPLACE, VALIDATOR_6). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_6;
                    params.type = BIRTHPLACE;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (BIRTHPLACE, VALIDATOR_6) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (BIRTHPLACE, VALIDATOR_7). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_7;
                    params.type = BIRTHPLACE;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) that has no validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, 0 red flags and 0 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(0);

                });

                // Notarizations (N) and Rejections (R) start here

                it('Notarize a validation request (OWNER, BIRTHPLACE, VALIDATOR) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) that has (N) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, 0 red flags and 0 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(0);

                });

                it('Create an Identity Use Request for a service that requires 1 attributes and 1 notarization. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {
                    let params = <any>{};
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE2_NAME;
                    params.values = [{ type: BIRTHPLACE, value: "Louisville" }];
                    let body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Notarize a validation request (OWNER, BIRTHPLACE, VALIDATOR_2) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) that has (NN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, 0 red flags and 0 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(0);
                });

                it('Reject a validation request (OWNER, BIRTHPLACE, VALIDATOR_3) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.reason = REASON_1024_GOOD;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) that has (NNR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, "active" true, "rejected" false, "dangerOfRejection" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                });

                it('Reject a validation request (OWNER, BIRTHPLACE, VALIDATOR_4) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.reason = REASON_1024_GOOD;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) that has (NNRR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, "active" true, "rejected" false, "dangerOfRejection" true, 2 red flags and 2 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(TRUE);
                });

                it('Reject a validation request (OWNER, BIRTHPLACE, VALIDATOR_5) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.reason = REASON_1024_GOOD;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) that has (NNRRR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, "active" false, "rejected" true, "dangerOfRejection" false, 3 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                });

                // Unsuccessful actions after attribute becomes rejected

                it('As a VALIDATOR, I want to Notarize a validation request (BIRTHPLACE, VALIDATOR_6) for a rejected attribute. ' +
                    'EXPECTED : FAILURE. ERROR : REJECTED_ATTRIBUTE' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REJECTED_ATTRIBUTE);
                });

                it('As a VALIDATOR, I want to Reject a validation request (BIRTHPLACE, VALIDATOR_6) for a rejected attribute. ' +
                    'EXPECTED : FAILURE. ERROR : REJECTED_ATTRIBUTE' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REJECTED_ATTRIBUTE);
                });

                it('As a VALIDATOR, I want to Approve a validation request (BIRTHPLACE, VALIDATOR_7) for a rejected attribute. ' +
                    'EXPECTED : FAILURE. ERROR : REJECTED_ATTRIBUTE' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REJECTED_ATTRIBUTE);
                });

                it('As a VALIDATOR, I want to Decline a validation request (BIRTHPLACE, VALIDATOR_7) for a rejected attribute. ' +
                    'EXPECTED : FAILURE. ERROR : REJECTED_ATTRIBUTE' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REJECTED_ATTRIBUTE);
                });

                it('As an OWNER, I want to Cancel a validation request (BIRTHPLACE, VALIDATOR_7) for a rejected attribute. ' +
                    'EXPECTED : FAILURE. ERROR : REJECTED_ATTRIBUTE' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REJECTED_ATTRIBUTE);
                });

                it('As an OWNER, I want to Create a validation request (BIRTHPLACE, VALIDATOR_8) for a rejected attribute. ' +
                    'EXPECTED : FAILURE. ERROR : REJECTED_ATTRIBUTE' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.REJECTED_ATTRIBUTE);
                });

                it('As a PUBLIC user, I want to Get the details of a Rejected Identity Use Request (one of the attributes received 3 straight red flags). ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, status is REJECTED', async () => {

                    const result = await utils[request]("GET", "v2/services?provider=" + PROVIDER + "&name=" + SERVICE2_NAME);
                    const response = await utils[request]("GET", "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                    expect(response.data.identity_use_requests[0].status).toBe(constants.identityUseRequestStatus.REJECTED);
                });

                it('As a PROVIDER, I want to Approve a REJECTED Identity Use Request. ' +
                    'EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_REJECTED_NO_ACTION', async () => {
                    let params = <any>{};
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    let body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/approve", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_REJECTED_NO_ACTION);
                });

                it('As a PROVIDER, I want to Decline a REJECTED Identity Use Request. ' +
                    'EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_REJECTED_NO_ACTION', async () => {
                    let params = <any>{};
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = PROVIDER_SECRET;
                    params.publicKey = PROVIDER_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/decline", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_REJECTED_NO_ACTION);
                });

                it('As an OWNER, I want to End a REJECTED Identity Use Request. ' +
                    'EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_REJECTED_NO_ACTION', async () => {
                    let params = <any>{};
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/end", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_REJECTED_NO_ACTION);
                });

                it('As an OWNER, I want to Cancel a REJECTED Identity Use Request. ' +
                    'EXPECTED : FAILURE. ERROR : IDENTITY_USE_REQUEST_REJECTED_NO_ACTION', async () => {
                    let params = <any>{};
                    params.serviceName = SERVICE2_NAME;
                    params.serviceProvider = PROVIDER;
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    let body = createAnswerIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use/cancel", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.IDENTITY_USE_REQUEST_REJECTED_NO_ACTION);
                });

                // Now do an update

                it('Update an attribute (BIRTHPLACE). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {
                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);
                    let params = <any>{};
                    params.id = attribute.data.attributes[0].id;
                    params.type = BIRTHPLACE;
                    params.value = NEW_BIRTHPLACE_VALUE;
                    params.expire_timestamp = 555555555;
                    let body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (BIRTHPLACE) which was rejected with 3 red flags, then updated. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, "active" false, "rejected" false, "dangerOfRejection" false, 0 red flags and 0 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(NEW_BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                });

                it('As a PUBLIC user, I want to Get validation requests (BIRTHPLACE) for an attribute that was just updated. ' +
                    'EXPECTED : SUCCESS. RESULT : 0 Results, because previous validations happened before the update', async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);
                    const response = await utils[request](
                        "GET", "v2/attribute-validations/validationrequest?attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(0);
                });

                // Now create a validation process all over again

                it('Create a validation request (BIRTHPLACE, VALIDATOR) for a recently updated attribute, even though a validation request ' +
                    'was completed for this attribute prior to the last update. EXPECTED : SUCCESS. RESULT : Transaction ID ', async () => {

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

                it('As a VALIDATOR, I want to Approve a validation request (BIRTHPLACE, VALIDATOR) that is PENDING_APPROVAL, for a recently updated attribute, ' +
                    'even though a validation request was completed for this attribute prior to the last update. EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a VALIDATOR, I want to Reject a validation request (BIRTHPLACE, VALIDATOR) that is IN_PROGRESS, for a recently updated attribute, ' +
                    'even though a validation request was completed for this attribute prior to the last update. EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = BIRTHPLACE;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute that was rejected with 3 red flags, then updated, then Rejected again. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + BIRTHPLACE);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(NEW_BIRTHPLACE_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(BIRTHPLACE);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                });

            })
    });

    describe('Use Case #2 : RRNRNNN - 4 Validations without a consensus followed by 3 Notarizations in a row', function () {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Use Case #2 : RRNRNNN - 4 Validations without a consensus followed by 3 Notarizations in a row",
            (header, request) => {

                it('Create a validation request (ALIAS, VALIDATOR). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (ALIAS, VALIDATOR_2). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_2;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_2) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (ALIAS, VALIDATOR_3). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_3;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_3) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (ALIAS, VALIDATOR_4). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_4;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_4) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (ALIAS, VALIDATOR_5). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_5;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_5) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (ALIAS, VALIDATOR_6). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_6;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_6) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (ALIAS, VALIDATOR_7). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_7;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_7) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                // Notarizations (N) and Rejections (R) start here

                it('Reject a validation request (OWNER, ALIAS, VALIDATOR) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (R) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, 1 red flags and 1 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);

                });

                it('Reject a validation request (OWNER, ALIAS, VALIDATOR_2) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (RR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" true, 2 red flags and 2 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(2);

                });

                it('Notarize a validation request (OWNER, ALIAS, VALIDATOR_3) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (RRN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" false, 2 red flags and 2 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(2);

                });

                it('Reject a validation request (OWNER, ALIAS, VALIDATOR_4) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (RRNR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" false, 3 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                });

                it('Notarize a validation request (OWNER, ALIAS, VALIDATOR_5) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (RRNRN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" false, 3 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                });

                it('Notarize a validation request (OWNER, ALIAS, VALIDATOR_6) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (RRNRNN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" true, 3 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                });

                it('Notarize a validation request (OWNER, ALIAS, VALIDATOR_7) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) that has (RRNRNNN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, "dangerOfRejection" false, 0 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                });

                it('Create a validation request (ALIAS, VALIDATOR_8) for an attribute which has 3 Notarizations in a row. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_8;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (ALIAS, VALIDATOR_8) for an attribute which has 3 Notarizations in a row. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_8;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET_8;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_8;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                // Now do an update

                it('Update an attribute (ALIAS). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {
                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);
                    let params = <any>{};
                    params.id = attribute.data.attributes[0].id;
                    params.type = ALIAS;
                    params.value = NEW_ALIAS_VALUE;
                    params.expire_timestamp = 555555555;
                    let body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (ALIAS) which was rejected with 3 red flags, then updated. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, "active" false, "rejected" false, "dangerOfRejection" false, 0 red flags and 0 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(NEW_ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                });

                it('As a PUBLIC user, I want to Get validation requests (ALIAS) for an attribute that was just updated. ' +
                    'EXPECTED : SUCCESS. RESULT : 0 Results, because previous validations happened before the update', async () => {

                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);
                    const response = await utils[request](
                        "GET", "v2/attribute-validations/validationrequest?attributeId=" + attribute.data.attributes[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(ATTRIBUTE_VALIDATION_REQUESTS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_validation_requests).toHaveLength(0);
                });

                // Now create a validation process all over again

                it('Create a validation request (ALIAS, VALIDATOR) for a recently updated attribute, even though a validation request ' +
                    'was completed for this attribute prior to the last update. EXPECTED : SUCCESS. RESULT : Transaction ID ', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = ALIAS;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a VALIDATOR, I want to Approve a validation request (ALIAS, VALIDATOR) that is PENDING_APPROVAL, for a recently updated attribute, ' +
                    'even though a validation request was completed for this attribute prior to the last update. EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a VALIDATOR, I want to Reject a validation request (ALIAS, VALIDATOR) that is IN_PROGRESS, for a recently updated attribute, ' +
                    'even though a validation request was completed for this attribute prior to the last update. EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = ALIAS;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute that was notarized 3 times in a row, then updated, then Rejected. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ALIAS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(NEW_ALIAS_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(ALIAS);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                });

            })
    });

    describe('Use Case #3 : RNNNRRR - Rejection followed by 3 Notarizations and 3 more Rejections', function () {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Use Case #3 : RNNNRRR - Rejection followed by 3 Notarizations and 3 more Rejections",
            (header, request) => {

                it('Create a validation request (LAST_NAME, VALIDATOR). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (LAST_NAME, VALIDATOR_2). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_2;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR_2) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (LAST_NAME, VALIDATOR_3). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_3;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR_3) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (LAST_NAME, VALIDATOR_4). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_4;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR_4) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (LAST_NAME, VALIDATOR_5). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_5;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR_5) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (LAST_NAME, VALIDATOR_6). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_6;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR_6) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (LAST_NAME, VALIDATOR_7). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_7;
                    params.type = LAST_NAME;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (LAST_NAME, VALIDATOR_7) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                // Notarizations (N) and Rejections (R) start here

                it('Reject a validation request (OWNER, LAST_NAME, VALIDATOR) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (R) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, 1 red flags and 1 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);

                });

                it('Notarize a validation request (OWNER, LAST_NAME, VALIDATOR_2) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (RN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);

                });

                it('Notarize a validation request (OWNER, LAST_NAME, VALIDATOR_3) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (RNN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" false, "dangerOfRejection" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);

                });

                it('Notarize a validation request (OWNER, LAST_NAME, VALIDATOR_4) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (RNNN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, "dangerOfRejection" false, 0 red flags and 1 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);

                });

                it('Reject a validation request (OWNER, LAST_NAME, VALIDATOR_5) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (RNNNR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, "dangerOfRejection" false, 1 red flag and 2 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(2);
                });

                it('Reject a validation request (OWNER, LAST_NAME, VALIDATOR_6) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (RNNNRR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, "dangerOfRejection" true, 2 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                });

                it('Reject a validation request (OWNER, LAST_NAME, VALIDATOR_7) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = LAST_NAME;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (LAST_NAME) that has (RNNNRRR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" true, "dangerOfRejection" false, 3 red flags and 4 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + LAST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(LAST_NAME_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(LAST_NAME);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(4);
                });

            })
    });

    describe('Use Case #4 : NRNNRNR - No 3 Consecutive Notarizations in the first 7 Validations', function () {
        describe.each([["Accept", "requestWithAcceptHeader"]])(
            "Use Case #4 : NRNNRNR - No 3 Consecutive Notarizations in the first 7 Validations",
            (header, request) => {

                it('Create a validation request (PHONE_NUMBER, VALIDATOR). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

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

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

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

                it('Create a validation request (PHONE_NUMBER, VALIDATOR_2). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_2;
                    params.type = PHONE_NUMBER;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR_2) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (PHONE_NUMBER, VALIDATOR_3). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_3;
                    params.type = PHONE_NUMBER;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR_3) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (PHONE_NUMBER, VALIDATOR_4). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_4;
                    params.type = PHONE_NUMBER;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR_4) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (PHONE_NUMBER, VALIDATOR_5). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_5;
                    params.type = PHONE_NUMBER;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR_5) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (PHONE_NUMBER, VALIDATOR_6). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_6;
                    params.type = PHONE_NUMBER;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR_6) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Create a validation request (PHONE_NUMBER, VALIDATOR_7). ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.owner = OWNER;
                    params.validator = VALIDATOR_7;
                    params.type = PHONE_NUMBER;
                    let body = createAttributeValidationRequestBody(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/validationrequest", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Approve a validation request (PHONE_NUMBER, VALIDATOR_7) that is in PENDING_APPROVAL. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {

                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/approve", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Notarize a validation request (OWNER, PHONE_NUMBER, VALIDATOR) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET;
                    params.publicKey = VALIDATOR_PUBLIC_KEY;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (N) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, 0 red flags and 0 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(0);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(0);

                });

                it('Create an Identity Use Request for a service that requires 1 attributes and 1 notarization. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID', async () => {
                    let params = <any>{};
                    params.owner = OWNER;
                    params.secret = SECRET;
                    params.publicKey = PUBLIC_KEY;
                    params.serviceName = SERVICE_NAME;
                    params.serviceProvider = PROVIDER;
                    params.values = [{ type: PHONE_NUMBER, value: "0777342543" }];
                    let body = createIdentityUseRequest(params);
                    const response = await utils[request]("POST", "v2/identity-use", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('Reject a validation request (OWNER, PHONE_NUMBER, VALIDATOR_2) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_2;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_2;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_2;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (NR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, "dangerOfRejection" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);
                });

                it('Notarize a validation request (OWNER, PHONE_NUMBER, VALIDATOR_3) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_3;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_3;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_3;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (NRN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);

                });

                it('Notarize a validation request (OWNER, PHONE_NUMBER, VALIDATOR_4) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_4;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_4;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_4;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (NRNN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, 1 red flag and 1 yellow flag', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(1);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(1);
                });

                it('Reject a validation request (OWNER, PHONE_NUMBER, VALIDATOR_5) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_5;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_5;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_5;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (NRNNR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" true, "dangerOfRejection" false, 2 red flags and 2 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(2);
                });

                it('Notarize a validation request (OWNER, PHONE_NUMBER, VALIDATOR_6) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_6;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_6;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_6;
                    params.validationType = constants.validationType.FACE_TO_FACE;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/notarize", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (NRNNRN) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" true, "rejected" false, 2 red flags and 2 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(TRUE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(2);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(2);
                });

                it('Reject a validation request (OWNER, PHONE_NUMBER, VALIDATOR_7) correctly. ' +
                    'EXPECTED : SUCCESS. RESULT : Transaction ID' , async () => {
                    let params = <any>{};
                    params.validator = VALIDATOR_7;
                    params.owner = OWNER;
                    params.type = PHONE_NUMBER;
                    params.secret = VALIDATOR_SECRET_7;
                    params.publicKey = VALIDATOR_PUBLIC_KEY_7;
                    params.reason = REASON_1024_GOOD;
                    let body = createAnswerAttributeValidationRequest(params);
                    const response = await utils[request]("POST", "v2/attribute-validations/reject", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                });

                it('As a PUBLIC user, I want to Get the details of an attribute (PHONE_NUMBER) that has (NRNNRNR) validations. ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, with "active" false, "rejected" true, "dangerOfRejection" false, 3 red flags and 3 yellow flags', async () => {

                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes[0]).toHaveProperty(VALUE_PROP);
                    expect(response.data.attributes[0].value).toBe(PHONE_NUMBER_VALUE);
                    expect(response.data.attributes[0]).toHaveProperty(TYPE_PROP);
                    expect(response.data.attributes[0].type).toBe(PHONE_NUMBER);
                    expect(response.data.attributes[0]).toHaveProperty(OWNER_PROP);
                    expect(response.data.attributes[0]).toHaveProperty(ACTIVE);
                    expect(response.data.attributes[0].active).toBe(FALSE);

                    expect(response.data.attributes[0]).toHaveProperty(REJECTED);
                    expect(response.data.attributes[0].rejected).toBe(TRUE);
                    expect(response.data.attributes[0]).toHaveProperty(DANGER_OF_REJECTION);
                    expect(response.data.attributes[0].dangerOfRejection).toBe(FALSE);
                    expect(response.data.attributes[0]).toHaveProperty(RED_FLAGS);
                    expect(response.data.attributes[0].redFlags).toBe(3);
                    expect(response.data.attributes[0]).toHaveProperty(YELLOW_FLAGS);
                    expect(response.data.attributes[0].yellowFlags).toBe(3);
                });

                it('As a PUBLIC user, I want to Get the details of a Rejected Identity Use Request (one of the attributes did not have 3 consecutive notarizations in the first batch). ' +
                    'EXPECTED : SUCCESS. RESULT : 1 Result, status is REJECTED', async () => {

                    const result = await utils[request]("GET", "v2/services?provider=" + PROVIDER + "&name=" + SERVICE_NAME);
                    const response = await utils[request]("GET", "v2/identity-use?owner=" + OWNER + "&serviceId=" + result.data.services[0].id);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty("identity_use_requests");
                    expect(response.data.identity_use_requests).toBeArray();
                    expect(response.data.identity_use_requests.length).toBe(1);
                    expect(response.data.identity_use_requests[0]).toHaveProperty("status");
                    expect(response.data.identity_use_requests[0].status).toBe(constants.identityUseRequestStatus.REJECTED);
                });



            })
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
    request.asset.attribute[0].type = param.type ? param.type : LAST_NAME;
    request.asset.attribute[0].owner = param.owner ? param.owner : OWNER;
    request.asset.attribute[0].value = param.value ? param.value : LAST_NAME_VALUE;
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

function createIdentityUseRequest(param) {

    let request = <any>{};
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

function createAnswerIdentityUseRequest(param) {
    let request = <any>{};
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

function updateAttributeRequest(param) {
    let request = <any>{};
    if (!param) {
        param = {}
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.attribute = [];
    request.asset.attribute[0] = {};
    request.asset.attribute[0].id = param.id;
    request.asset.attribute[0].type = param.type ? param.type : LAST_NAME;
    request.asset.attribute[0].owner = param.owner ? param.owner : OWNER;
    if (param.value) {
        request.asset.attribute[0].value = param.value;
    }
    if (param.associations) {
        request.asset.attribute[0].associations = param.associations;
    }
    if (param.expire_timestamp) {
        request.asset.attribute[0].expire_timestamp =  param.expire_timestamp;
    }

    console.log(JSON.stringify(request));
    return request;
}
