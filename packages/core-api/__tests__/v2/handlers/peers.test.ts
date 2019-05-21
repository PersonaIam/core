import "@arkecosystem/core-test-utils";
import { utils } from "../utils";

beforeAll(async () => {
});

afterAll(async () => {
});

describe("API 2.0 - Peers", () => {
    describe("GET /peers", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (_, request) => {
                it("should GET all the peers", async () => {
                    const response = await utils[request]("GET", "v2/peers");
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();
                });
            },
        );
    });
});
