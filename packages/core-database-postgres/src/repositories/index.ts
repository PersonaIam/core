import { AttributesRepository } from "./attributes";
import { AttributeValidationsRepository } from "./attributeValidations";
import { BlocksRepository } from "./blocks";
import { IdentityUsesRepository } from "./identityUses";
import { MigrationsRepository } from "./migrations";
import { RoundsRepository } from "./rounds";
import { ServicesRepository } from "./service";
import { TransactionsRepository } from "./transactions";

export const repositories = {
    attributes: AttributesRepository,
    attributeValidations: AttributeValidationsRepository,
    identityUses: IdentityUsesRepository,
    services: ServicesRepository,
    blocks: BlocksRepository,
    migrations: MigrationsRepository,
    rounds: RoundsRepository,
    transactions: TransactionsRepository,
};
