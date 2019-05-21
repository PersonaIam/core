import "@arkecosystem/core-test-utils";
import { utils } from "../utils";

const voteId = "ea294b610e51efb3ceb4229f27bf773e87f41d21b6bb1f3bf68629ffd652c2d3";

beforeAll(async () => {
});

afterAll(async () => {
});

describe("API 2.0 - Votes", () => {
    describe("GET /votes", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the votes", async () => {
                    const response = await utils[request]("GET", "v2/votes");
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();
                    utils.expectPaginator(response);

                    expect(response.data.data[0]).toBeObject();
                    expect(response.data.meta.count).toBeNumber();
                });
            },
        );
    });

    describe("GET /votes/:id", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET a vote by the given identifier", async () => {
                    const response = await utils[request]("GET", `v2/votes/${voteId}`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeObject();

                    expect(response.data.data).toBeObject();
                    expect(response.data.data.id).toBe(voteId);
                });
            },
        );
    });
});
