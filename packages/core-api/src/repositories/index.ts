import { AttributesRepository } from "./attributes";
import { AttributeTypesRepository } from "./attributeTypes";
import { AttributeValidationsRepository } from "./attributeValidations";
import { BlockRepository } from "./blocks";
import { ServicesRepository } from "./services";
import { TransactionsRepository } from "./transactions";
import { IdentityUsesRepository } from "./identityUses";

const blocksRepository = new BlockRepository();
const transactionsRepository = new TransactionsRepository();
const attributesRepository = new AttributesRepository();
const attributeTypesRepository = new AttributeTypesRepository();
const attributeValidationsRepository = new AttributeValidationsRepository();
const servicesRepository = new ServicesRepository();
const identityUsesRepository = new IdentityUsesRepository();

export {    blocksRepository, transactionsRepository, attributesRepository,
            attributeTypesRepository, attributeValidationsRepository, servicesRepository, identityUsesRepository,

            BlockRepository, TransactionsRepository, AttributesRepository,
            AttributeTypesRepository, AttributeValidationsRepository, ServicesRepository, IdentityUsesRepository
};
