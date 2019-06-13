import Hapi from "hapi";
import * as Attributes from "./attributes";
import * as AttributeValidations from "./attributevalidations";
import * as Services from "./services";
import * as Blockchain from "./blockchain";
import * as Blocks from "./blocks";
import * as Delegates from "./delegates";
import * as IdentityUses from "./identityuses";
import * as Node from "./node";
import * as Peers from "./peers";
import * as Transactions from "./transactions";
import * as Votes from "./votes";
import * as Wallets from "./wallets";

const register = async (server: Hapi.Server): Promise<void> => {
    const modules = [Attributes, AttributeValidations, Blockchain, Blocks, Delegates, IdentityUses, Node, Peers, Services, Transactions, Votes, Wallets];

    for (const module of modules) {
        module.register(server);
    }
};

export = {
    register,
    name: "Public API",
    version: "2.0.0",
};
