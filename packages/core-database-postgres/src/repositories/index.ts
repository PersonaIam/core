import { AttributesRepository } from "./attributes";
import { AttributeValidationsRepository } from "./attributeValidations";
import { BlocksRepository } from "./blocks";
import { MigrationsRepository } from "./migrations";
import { RoundsRepository } from "./rounds";
import { TransactionsRepository } from "./transactions";
import { WalletsRepository } from "./wallets";

export const repositories = {
    attributes: AttributesRepository,
    attributeValidations: AttributeValidationsRepository,
    blocks: BlocksRepository,
    migrations: MigrationsRepository,
    rounds: RoundsRepository,
    transactions: TransactionsRepository,
    wallets: WalletsRepository,
};
