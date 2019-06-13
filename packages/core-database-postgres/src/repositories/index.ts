import { AttributesRepository } from "./attributes";
import { AttributeValidationsRepository } from "./attributeValidations";
import { ServicesRepository } from "./service";
import { IdentityUsesRepository } from "./identityUses";
import { BlocksRepository } from "./blocks";
import { MigrationsRepository } from "./migrations";
import { RoundsRepository } from "./rounds";
import { TransactionsRepository } from "./transactions";
import { WalletsRepository } from "./wallets";

export const repositories = {
    attributes: AttributesRepository,
    attributeValidations: AttributeValidationsRepository,
    identityUses: IdentityUsesRepository,
    services: ServicesRepository,
    blocks: BlocksRepository,
    migrations: MigrationsRepository,
    rounds: RoundsRepository,
    transactions: TransactionsRepository,
    wallets: WalletsRepository,
};
