// import "@arkecosystem/core-test-utils";
import sleep from "sleep";
import { messages } from "../../../../../packages/core-api/src/versions/2/messages";
import { delegates } from "../data";
import { secrets } from "../data";
import { utils } from "../utils";

let globalTimestamp = 0;

const ATTRIBUTES = "attributes";
const ATTRIBUTE_TYPES = "attribute_types";
const COUNT = "count";
const ACTIVE = "active";
const SUCCESS = "success";
const MESSAGE = "message";
const TRANSACTION_ID = "transactionId";
const FALSE = false;
const TRUE = true;
const ERROR = "error";
const OWNER_PROP = "owner";
const TYPE_PROP = "type";
const VALUE_PROP = "value";
const EXPIRE_TIMESTAMP_PROP = "expire_timestamp";

const SLEEP_TIME = 10001;

// DATA

const OWNER = delegates[0].senderId;
const SECRET = secrets[0];
const PUBLIC_KEY = delegates[0].senderPublicKey;

const OTHER_OWNER = delegates[1].senderId;
const OTHER_SECRET = secrets[1];
const OTHER_PUBLIC_KEY = delegates[1].senderPublicKey;

const FIRST_NAME = "first_name";
const PHONE_NUMBER = "phone_number";
const BIRTHPLACE = "birthplace";
const ADDRESS = "address";
const IDENTITY_CARD = "identity_card";
const INCORRECT_TYPE = "whatevs";

const ADDRESS_VALUE = "Denver";
const NAME_VALUE = "FRANK";
const SECOND_NAME_VALUE = "QUEEN";
const PHONE_NUMBER_VALUE = "345654321";
const BIRTHPLACE_VALUE = "Calgary";
const NEW_ADDRESS = "Edmonton";
const NEW_ADDRESS2 = "Toronto";

const INCORRECT_ADDRESS = "ABC";

describe("API 2.0", () => {
    describe("Attribute Types", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Basic Operations", (header, request) => {
            it(
                "As a PUBLIC user, I want to Get the details of an attribute type (FIRST_NAME)." +
                    "EXPECTED : SUCCESS. RESULT : Attribute type details (name is FIRST_NAME)",
                async () => {
                    const response = await utils[request]("GET", "v2/attributes/types?name=" + FIRST_NAME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data.attribute_type).toHaveProperty("id");
                    expect(response.data.attribute_type).toHaveProperty("data_type");
                    expect(response.data.attribute_type).toHaveProperty("validation");
                    expect(response.data.attribute_type).toHaveProperty("options");
                    expect(response.data.attribute_type).toHaveProperty("name");
                    expect(response.data.attribute_type.name).toBe(FIRST_NAME);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of an attribute type that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : ATTRIBUTE_TYPE_NOT_FOUND",
                async () => {
                    const response = await utils[request]("GET", "v2/attributes/types?name=weight");

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.ATTRIBUTE_TYPE_NOT_FOUND);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the list of attribute types. " +
                    "EXPECTED : SUCCESS. RESULT : Attribute type list",
                async () => {
                    const response = await utils[request]("GET", "v2/attributes/types/list");

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTE_TYPES);
                    expect(response.data.attribute_types).toBeArray();
                    expect(response.data).toHaveProperty(COUNT);
                    expect(response.data.count).toBeGreaterThanOrEqual(1);
                },
            );
        });
    });

    describe("Create Attribute", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Create Attribute", (header, request) => {
            it(
                "As a PUBLIC user, I want to Get the attributes of a user (OTHER_OWNER) that has no attributes. " +
                    'EXPECTED : SUCCESS. RESULT : Empty "attributes" array',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(0);
                },
            );

            it(
                "As an OWNER, I want to Create a non file attribute and provide associations. " +
                    "EXPECTED : FAILURE. ERROR : ASSOCIATIONS_NOT_SUPPORTED_FOR_NON_FILE_TYPES",
                async () => {
                    const params = {} as any;
                    params.associations = [1];
                    const body = createAttributeBody(params);

                    const response = await utils[request]("POST", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.ASSOCIATIONS_NOT_SUPPORTED_FOR_NON_FILE_TYPES);
                    return;
                },
            );

            it(
                "As an OWNER, I want to Create a non file attribute (FIRST_NAME). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
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
                "Create a non file attribute (PHONE_NUMBER). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
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
                "Create a non file attribute (BIRTHPLACE). " + "EXPECTED : SUCCESS. RESULT : Transaction ID",
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

            it("Create a non file attribute (ADDRESS). " + "EXPECTED : SUCCESS. RESULT : Transaction ID", async () => {
                const param = {} as any;
                param.value = ADDRESS_VALUE;
                param.type = ADDRESS;

                const body = createAttributeBody(param);
                const response = await utils[request]("POST", "v2/attributes", body);
                sleep.msleep(SLEEP_TIME);
                expect(response.data).toHaveProperty(SUCCESS);
                expect(response.data).toHaveProperty(TRANSACTION_ID);
                expect(response.data.success).toBe(TRUE);
            });

            it(
                "As a PUBLIC user, I want to Get the details of an attribute (OWNER, FIRST_NAME). " +
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

            it(
                "As a PUBLIC user, I want to Get the details of an attribute without providing the owner parameter. " +
                    "EXPECTED : FAILURE. ERROR : MISSING_OWNER_ADDRESS",
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?type=" + FIRST_NAME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.MISSING_OWNER_ADDRESS);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of an attribute by providing a correct owner and an incorrect attribute type. " +
                    'EXPECTED : SUCCESS. RESULT : "attributes" as an empty array',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=weight");
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toHaveLength(0);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of an attribute that does not exist (OWNER, SSN). " +
                    'EXPECTED : SUCCESS. RESULT : Empty "attributes" array',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=ssn");
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toHaveLength(0);
                },
            );

            it(
                "As an OWNER, I want to Create a non file attribute type, but the provided owner address is invalid. " +
                    "EXPECTED : FAILURE. ERROR : INVALID_OWNER_ADDRESS",
                async () => {
                    const param = {} as any;
                    param.owner = INCORRECT_ADDRESS;

                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.INVALID_OWNER_ADDRESS);
                },
            );

            it(
                "As an OWNER, I want to Create an attribute, but the provided attribute type does not exist. " +
                    "EXPECTED : FAILURE. ERROR : ATTRIBUTE_TYPE_NOT_FOUND",
                async () => {
                    const param = {} as any;
                    param.owner = OWNER;
                    param.value = "none";
                    param.type = INCORRECT_TYPE;

                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.ATTRIBUTE_TYPE_NOT_FOUND);
                },
            );

            it(
                "As an OTHER_OWNER, I want to Create an attribute for some other user (OWNER). " +
                    "EXPECTED : FAILURE. ERROR : SENDER_IS_NOT_OWNER",
                async () => {
                    const param = {} as any;
                    param.owner = OTHER_OWNER;
                    param.secret = SECRET;
                    param.publicKey = PUBLIC_KEY;
                    param.value = "none";
                    param.type = FIRST_NAME;

                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SENDER_IS_NOT_OWNER);
                },
            );

            it(
                "As an OWNER, I want to Create a file type attribute and provide as association an attribute that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER",
                async () => {
                    const params = {} as any;
                    params.associations = [1000];
                    params.type = IDENTITY_CARD;
                    params.expire_timestamp = 555555555;
                    const body = createAttributeBody(params);

                    const response = await utils[request]("POST", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER);
                    return;
                },
            );

            it(
                "Create a non file attribute (OTHER_OWNER, FIRST_NAME). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const param = {} as any;
                    param.owner = OTHER_OWNER;
                    param.secret = OTHER_SECRET;
                    param.publicKey = OTHER_PUBLIC_KEY;
                    param.value = SECOND_NAME_VALUE;

                    const body = createAttributeBody(param);
                    const response = await utils[request]("POST", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                    expect(response.data.success).toBe(TRUE);
                },
            );

            it(
                "As an OWNER, I want to Create a file type attribute and provide as association an attribute that belongs to a different user. " +
                    "EXPECTED : FAILURE. ERROR : ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER",
                async () => {
                    const otherOwnerAttribute = await utils[request](
                        "GET",
                        "v2/attributes?owner=" + OTHER_OWNER + "&type=" + FIRST_NAME,
                    );
                    const otherOwnerAttributeId = otherOwnerAttribute.data.attributes[0].id;

                    const params = {} as any;
                    params.associations = [otherOwnerAttributeId];
                    params.type = IDENTITY_CARD;
                    params.expire_timestamp = 555555555;
                    const body = createAttributeBody(params);

                    const response = await utils[request]("POST", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER);
                    return;
                },
            );

            it(
                "As an OWNER, I want to Create a file type attribute and provide as association 2 attributes, one of which belongs to a different user. " +
                    "EXPECTED : FAILURE. ERROR : ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER",
                async () => {
                    const otherOwnerAttribute = await utils[request](
                        "GET",
                        "v2/attributes?owner=" + OTHER_OWNER + "&type=" + FIRST_NAME,
                    );
                    const otherOwnerAttributeId = otherOwnerAttribute.data.attributes[0].id;

                    const ownerAttribute = await utils[request](
                        "GET",
                        "v2/attributes?owner=" + OWNER + "&type=" + PHONE_NUMBER,
                    );
                    const ownerAttributeId = ownerAttribute.data.attributes[0].id;

                    const params = {} as any;
                    params.associations = [otherOwnerAttributeId, ownerAttributeId];
                    params.type = IDENTITY_CARD;
                    params.expire_timestamp = 555555555;
                    const body = createAttributeBody(params);

                    const response = await utils[request]("POST", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data.error).toBe(messages.ATTRIBUTE_ASSOCIATION_DOES_NOT_EXIST_FOR_CURRENT_OWNER);
                    return;
                },
            );

            it(
                "As a PUBLIC user, I want to Get the attributes of a user (OTHER_OWNER) that has 1 attribute. " +
                    'EXPECTED : SUCCESS. RESULT : Contains "attributes" as an array with 1 element',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OTHER_OWNER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(1);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the attributes of a user (OWNER) that has multiple attributes. " +
                    'EXPECTED : SUCCESS. RESULT : Contains "attributes" as an array with 4 elements',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(4);
                },
            );
        });
    });

    describe("Update Attribute", () => {
        describe.each([["Accept", "requestWithAcceptHeader"]])("Update Attribute", (header, request) => {
            it(
                "As an OWNER, I want to Update a non file attribute (ADDRESS). " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);
                    const params = {} as any;
                    params.id = attribute.data.attributes[0].id;
                    params.type = ADDRESS;
                    params.value = NEW_ADDRESS;
                    params.expire_timestamp = 555555555;
                    const body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the attributes of a user (OWNER) that has multiple attributes, immediately after updating one of them. " +
                    'EXPECTED : SUCCESS. RESULT : Contains "attributes" as an array with 4 elements',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(4);
                },
            );

            it(
                "As a PUBLIC user, I want to Get the details of a recently updated non file attribute (OWNER, ADDRESS). " +
                    'EXPECTED : SUCCESS. RESULT : Contains "value" as the new address value',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(1);
                    expect(response.data.attributes[0].value).toBe(NEW_ADDRESS);
                    expect(response.data.attributes[0].type).toBe(ADDRESS);
                },
            );

            it(
                "As an OWNER, I want to Update an attribute that does not exist. " +
                    "EXPECTED : FAILURE. ERROR : ATTRIBUTE_NOT_FOUND_FOR_UPDATE",
                async () => {
                    const params = {} as any;
                    params.id = 777;
                    params.type = ADDRESS;
                    params.value = NEW_ADDRESS;
                    params.expire_timestamp = 555555555;
                    const body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.ATTRIBUTE_NOT_FOUND_FOR_UPDATE);
                },
            );

            it(
                "As an OWNER, I want to Update an attribute (ADDRESS) by changing the expire timestamp, keeping the value the same. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);
                    const params = {} as any;
                    params.id = attribute.data.attributes[0].id;
                    params.type = ADDRESS;
                    globalTimestamp = attribute.data.attributes[0].expire_timestamp + 10000;
                    params.expire_timestamp = globalTimestamp;
                    const body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of a recently updated non file attribute (OWNER, ADDRESS). " +
                    'EXPECTED : SUCCESS. RESULT : Contains "expire_timestamp" as the new expire timestamp value',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(1);
                    expect(response.data.attributes[0].value).toBe(NEW_ADDRESS);
                    expect(response.data.attributes[0].type).toBe(ADDRESS);
                    expect(response.data.attributes[0].expire_timestamp).toBe(globalTimestamp);
                },
            );

            it(
                "As an OWNER, I want to Update an attribute (ADDRESS) by changing the value, keeping the expire timestamp the same. " +
                    "EXPECTED : SUCCESS. RESULT : Transaction ID",
                async () => {
                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);
                    const params = {} as any;
                    params.id = attribute.data.attributes[0].id;
                    params.type = ADDRESS;
                    params.value = NEW_ADDRESS2;
                    const body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(TRANSACTION_ID);
                },
            );

            it(
                "Get the details of a recently updated non file attribute (OWNER, ADDRESS). " +
                    'EXPECTED : SUCCESS. RESULT : Contains "value" as the new address value',
                async () => {
                    const response = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(ATTRIBUTES);
                    expect(response.data.attributes).toBeArray();
                    expect(response.data.attributes).toHaveLength(1);
                    expect(response.data.attributes[0].value).toBe(NEW_ADDRESS2);
                    expect(response.data.attributes[0].type).toBe(ADDRESS);
                    expect(response.data.attributes[0].expire_timestamp).toBe(globalTimestamp);
                },
            );

            it(
                "As an OWNER, I want to Update an attribute for some other user (OTHER_OWNER). " +
                    "EXPECTED : FAILURE. ERROR : SENDER_IS_NOT_OWNER",
                async () => {
                    const attribute = await utils[request](
                        "GET",
                        "v2/attributes?owner=" + OTHER_OWNER + "&type=" + FIRST_NAME,
                    );
                    const param = {} as any;
                    param.id = attribute.data.attributes[0].id;
                    param.owner = OTHER_OWNER;
                    param.secret = SECRET;
                    param.publicKey = PUBLIC_KEY;
                    param.value = "Daniel";
                    param.type = FIRST_NAME;

                    const body = updateAttributeRequest(param);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(FALSE);
                    expect(response.data).toHaveProperty(ERROR);
                    expect(response.data.error).toBe(messages.SENDER_IS_NOT_OWNER);
                },
            );

            it(
                "As an OWNER, I want to Update a non file attribute (ADDRESS) but change nothing in the attribute itself. " +
                    'EXPECTED : SUCCESS. RESULT : "message" result with value NOTHING_TO_UPDATE',
                async () => {
                    const attribute = await utils[request]("GET", "v2/attributes?owner=" + OWNER + "&type=" + ADDRESS);
                    const params = {} as any;
                    params.id = attribute.data.attributes[0].id;
                    params.type = ADDRESS;
                    params.value = NEW_ADDRESS2;
                    const body = updateAttributeRequest(params);
                    const response = await utils[request]("PUT", "v2/attributes", body);
                    sleep.msleep(SLEEP_TIME);

                    expect(response.data).toHaveProperty(SUCCESS);
                    expect(response.data.success).toBe(TRUE);
                    expect(response.data).toHaveProperty(MESSAGE);
                    expect(response.data.message).toBe(messages.NOTHING_TO_UPDATE);
                },
            );
        });
    });
});
// tslint:disable-next-line:only-arrow-functions
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
// tslint:disable-next-line:only-arrow-functions
function updateAttributeRequest(param) {
    const request = {} as any;
    if (!param) {
        param = {};
    }
    request.secret = param.secret ? param.secret : SECRET;
    request.publicKey = param.publicKey ? param.publicKey : PUBLIC_KEY;
    request.asset = {};
    request.asset.attribute = [];
    request.asset.attribute[0] = {};
    request.asset.attribute[0].id = param.id;
    request.asset.attribute[0].type = param.type ? param.type : FIRST_NAME;
    request.asset.attribute[0].owner = param.owner ? param.owner : OWNER;
    if (param.value) {
        request.asset.attribute[0].value = param.value;
    }
    if (param.associations) {
        request.asset.attribute[0].associations = param.associations;
    }
    if (param.expire_timestamp) {
        request.asset.attribute[0].expire_timestamp = param.expire_timestamp;
    }

    console.log(JSON.stringify(request));
    return request;
}
