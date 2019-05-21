import "@arkecosystem/core-test-utils";
import { utils } from "../utils";

const username = "genesis_8";
const address = "AdWRsk7Lbo97jxGBKzLAFwevVHbqVbW1Cj";
const publicKey = "03691178f8610d0a295e650201b62345056c788d7f9ac7e8570b69c6c90091b564";
const balance = 245098000000000;
const address2 = "AJjv7WztjJNYHrLAeveG5NgHWp6699ZJwD";

beforeAll(async () => {
});

afterAll(async () => {
});

describe("API 2.0 - Wallets", () => {
    describe("GET /wallets", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the wallets", async () => {
                    const response = await utils[request]("GET", "v2/wallets");
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    utils.expectWallet(response.data.data[0]);
                });
            },
        );
    });

    describe("GET /wallets/top", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the top wallets", async () => {
                    const response = await utils[request]("GET", "v2/wallets/top");
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    utils.expectWallet(response.data.data[0]);
                });
            },
        );
    });

    describe("GET /wallets/:id", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET a wallet by the given identifier", async () => {
                    const response = await utils[request]("GET", `v2/wallets/${address}`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeObject();

                    const wallet = response.data.data;
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                });
            },
        );

        describe("when requesting an unknown address", () => {
            describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
                "using the %s header",
                (header, request) => {
                    it("should return ResourceNotFound error", async () => {
                        try {
                            await utils[request]("GET", "v2/wallets/dummy");
                        } catch (error) {
                            expect(error.response.status).toEqual(404);
                        }
                    });
                },
            );
        });
    });

    describe("GET /wallets/:id/transactions", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the transactions for the given wallet by id", async () => {
                    const response = await utils[request]("GET", `v2/wallets/${address}/transactions`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    utils.expectTransaction(response.data.data[0]);
                });
            },
        );
    });

    describe("GET /wallets/:id/transactions/sent", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the send transactions for the given wallet by id", async () => {
                    const response = await utils[request]("GET", `v2/wallets/${address}/transactions/sent`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    const transaction = response.data.data[0];
                    utils.expectTransaction(transaction);
                    expect(transaction.sender).toBe(address);
                });
            },
        );
    });

    describe("GET /wallets/:id/transactions/received", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the received transactions for the given wallet by id", async () => {
                    const response = await utils[request]("GET", `v2/wallets/${address}/transactions/received`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    utils.expectTransaction(response.data.data[0]);
                });
            },
        );
    });

    describe("GET /wallets/:id/votes", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should GET all the votes for the given wallet by id", async () => {
                    const response = await utils[request]("GET", `v2/wallets/${address}/votes`);
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data[0]).toBeObject();
                });
            },
        );
    });

    describe("POST /wallets/search", () => {
        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the exact specified address", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                });

                it("should POST a search for wallets with the any of the specified addresses", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        addresses: [address, address2],
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();
                    expect(response.data.data).toHaveLength(2);

                    for (const wallet of response.data.data) {
                        utils.expectWallet(wallet);
                    }

                    const addresses = response.data.data.map(wallet => wallet.address).sort();
                    expect(addresses).toEqual([address2 , address]);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the exact specified publicKey", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                        publicKey,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                    expect(wallet.publicKey).toBe(publicKey);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the exact specified username", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                        username,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the exact specified balance", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                        balance: {
                            from: balance,
                            to: balance,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                    expect(wallet.balance).toBe(balance);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the specified balance range", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                        balance: {
                            from: balance - 1000,
                            to: balance + 1000,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                    expect(wallet.balance).toBe(balance);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the exact specified voteBalance", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                        voteBalance: {
                            from: balance,
                            to: balance,
                        },
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                });
            },
        );

        describe.each([["API-Version", "request"], ["Accept", "requestWithAcceptHeader"]])(
            "using the %s header",
            (header, request) => {
                it("should POST a search for wallets with the wrong specified username", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        address,
                        username: "dummy",
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
                it("should POST a search for wallets with the specific criteria", async () => {
                    const response = await utils[request]("POST", "v2/wallets/search", {
                        publicKey,
                        username,
                    });
                    expect(response).toBeSuccessfulResponse();
                    expect(response.data.data).toBeArray();

                    expect(response.data.data).toHaveLength(1);

                    const wallet = response.data.data[0];
                    utils.expectWallet(wallet);
                    expect(wallet.address).toBe(address);
                });
            },
        );
    });
});
