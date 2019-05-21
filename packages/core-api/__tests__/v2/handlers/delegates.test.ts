import "@arkecosystem/core-test-utils";
import { utils } from "../utils";
import { models } from "@arkecosystem/crypto";

const delegate = {
    username: "genesis_9",
    address: "AG8kwwk4TsYfA2HdwaWBVAJQBj6VhdcpMo",
    publicKey: "0377f81a18d25d77b100cb17e829a72259f08334d064f6c887298917a04df8f647",
};

beforeAll(async () => {
});

afterAll(async () => {
});

describe("API 2.0 - Delegates", () => {
    describe("GET /delegates", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the delegates", async () => {
                    const response = await utils[request]("GET", "v2/delegates");
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    response.data.data.forEach(utils.expectDelegate);
                    expect(response.data.data.sort((a, b) => a.rank < b.rank)).toEqual(response.data.data);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the delegates ordered by descending rank", async () => {
                    const response = await utils[request]("GET", "v2/delegates", { orderBy: "rank:desc" });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    response.data.data.forEach(utils.expectDelegate);
                    expect(response.data.data.sort((a, b) => a.rank > b.rank)).toEqual(response.data.data);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the delegates ordered by descending productivity", async () => {
                    const response = await utils[request]("GET", "v2/delegates", { orderBy: "productivity:desc" });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    response.data.data.forEach(utils.expectDelegate);
                    expect(
                        response.data.data.sort((a, b) => a.production.productivity > b.production.productivity),
                    ).toEqual(response.data.data);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the delegates ordered by descending approval", async () => {
                    const response = await utils[request]("GET", "v2/delegates", { orderBy: "approval:desc" });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    response.data.data.forEach(utils.expectDelegate);
                    expect(response.data.data.sort((a, b) => a.production.approval > b.production.approval)).toEqual(
                        response.data.data,
                    );
                });
            },
        );
    });

    describe("GET /delegates/:id", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET a delegate by the given username", async () => {
                    const response = await utils[request]("GET", `v2/delegates/${delegate.username}`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeObject();

                    utils.expectDelegate(response.data.data, delegate);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET a delegate by the given address", async () => {
                    const response = await utils[request]("GET", `v2/delegates/${delegate.address}`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeObject();

                    utils.expectDelegate(response.data.data, delegate);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET a delegate by the given public key", async () => {
                    const response = await utils[request]("GET", `v2/delegates/${delegate.publicKey}`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeObject();

                    utils.expectDelegate(response.data.data, delegate);
                });
            },
        );
    });

    describe("POST /delegates/search", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for delegates with a username that matches the given string", async () => {
                    const response = await utils[request]("POST", "v2/delegates/search", {
                        username: delegate.username,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    utils.expectDelegate(response.data.data[0], delegate);
                });
            },
        );
    });

    describe("GET /delegates/:id/voters", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all voters (wallets) for a delegate by the given identifier", async () => {
                    const response = await utils[request]("GET", `v2/delegates/${delegate.publicKey}/voters`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    utils.expectWallet(response.data.data[0]);
                });
            },
        );
    });

});
