import "@arkecosystem/core-test-utils";
import { utils } from "../utils";

import { models } from "@arkecosystem/crypto";
import genesisBlock from "../../../../core-test-utils/src/config/testnet/genesisBlock.json";

import { app } from "@arkecosystem/core-container";

const container = app;
const { Block } = models;

beforeAll(async () => {
    // await setUp();
    // await resetBlockchain();
});

afterAll(async () => {
    // await tearDown();
});

describe("API 2.0 - Blocks", () => {
    describe("GET /blocks", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            'using the "%s" header',
            (header, request) => {
                it("should GET all the blocks (v2)", async () => {
                    const response = await utils[request]("GET", "v2/blocks");

                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    const block = response.data.data[0];
                    utils.expectBlockV2(block, {
                    });
                });
            },
        );
    });


    describe("GET /blocks?orderBy=height:", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            'using the "%s" header',
            (header, request) => {
                it("should GET all the blocks in descending order (v2)", async () => {
                    const response = await utils[request]("GET", "v2/blocks?orderBy=height");
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    const block = response.data.data[0];
                    expect(block.height).toBeGreaterThan(0)
                });
            },
        );
    });

    describe("GET /blocks/:id", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET a block by the given identifier (v2)", async () => {
                    const response = await utils[request]("GET", `v2/blocks/${genesisBlock.id}`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeObject();

                    const block = response.data.data;
                    utils.expectBlockV2(block, {
                        id: genesisBlock.id,
                        transactions: genesisBlock.numberOfTransactions,
                    });
                });
            },
        );
    });

    describe("GET /blocks/:id/transactions", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            'using the "%s" header',
            (header, request) => {
                it("should GET all the transactions for the given block by id (v2)", async () => {
                    const response = await utils[request]("GET", `v2/blocks/${genesisBlock.id}/transactions`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    const transaction = response.data.data[0];
                    utils.expectTransaction(transaction);
                    expect(transaction.blockId).toBe(genesisBlock.id);
                });
            },
        );
    });

    describe("POST /blocks/search", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified blockId (v2)", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                });
            },
        );
    });

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified version", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        version: genesisBlock.version,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.version).toBe(genesisBlock.version);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified payloadHash", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        payloadHash: genesisBlock.payloadHash,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.payload.length).toBe(genesisBlock.payloadLength);
                    expect(block.payload.hash).toBe(genesisBlock.payloadHash);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified generatorPublicKey", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        generatorPublicKey: genesisBlock.generatorPublicKey,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.generator.publicKey).toBe(genesisBlock.generatorPublicKey);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified blockSignature", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        blockSignature: genesisBlock.blockSignature,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.signature).toBe(genesisBlock.blockSignature);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified timestamp", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        timestamp: {
                            from: genesisBlock.timestamp,
                            to: genesisBlock.timestamp,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specified height range", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        height: {
                            from: genesisBlock.height,
                            to: genesisBlock.height,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.height).toBe(genesisBlock.height);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified height", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        height: {
                            from: genesisBlock.height,
                            to: genesisBlock.height,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.height).toBe(genesisBlock.height);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified numberOfTransactions", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        numberOfTransactions: {
                            from: genesisBlock.numberOfTransactions,
                            to: genesisBlock.numberOfTransactions,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.transactions).toBe(genesisBlock.numberOfTransactions);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specified numberOfTransactions range", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        numberOfTransactions: {
                            from: genesisBlock.numberOfTransactions,
                            to: genesisBlock.numberOfTransactions,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.transactions).toBe(genesisBlock.numberOfTransactions);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified totalAmount", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        totalAmount: { from: 1 },
                    });

                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specified totalAmount range", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        totalAmount: { from: 1 },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified totalFee", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        totalFee: { from: 0 },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(+block.forged.fee).toBe(genesisBlock.totalFee);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specified totalFee range", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        totalFee: { from: 0 },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(+block.forged.fee).toBe(genesisBlock.totalFee);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified reward", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        reward: {
                            from: genesisBlock.reward,
                            to: genesisBlock.reward,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(+block.forged.reward).toBe(genesisBlock.reward);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specified reward range", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        reward: {
                            from: genesisBlock.reward,
                            to: genesisBlock.reward,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(+block.forged.reward).toBe(genesisBlock.reward);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the exact specified payloadLength", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        payloadLength: {
                            from: genesisBlock.payloadLength,
                            to: genesisBlock.payloadLength,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.payload.length).toBe(genesisBlock.payloadLength);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specified payloadLength range", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        payloadLength: {
                            from: genesisBlock.payloadLength,
                            to: genesisBlock.payloadLength,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                    expect(block.payload.length).toBe(genesisBlock.payloadLength);
                });
            },
        );


        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the wrong specified version", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        id: genesisBlock.id,
                        version: 2,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();
                    expect(response.data.data).toHaveLength(0);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for blocks with the specific criteria", async () => {
                    const response = await utils[request]("POST", "v2/blocks/search", {
                        generatorPublicKey: genesisBlock.generatorPublicKey,
                        version: genesisBlock.version,
                        timestamp: {
                            from: genesisBlock.timestamp,
                            to: genesisBlock.timestamp,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const block = response.data.data[0];
                    utils.expectBlockV2(block);
                    expect(block.id).toBe(genesisBlock.id);
                });
            },
        );
});






