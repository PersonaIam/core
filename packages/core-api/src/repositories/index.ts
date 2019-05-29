import { AttributesRepository } from "./attributes";
import { AttributeTypesRepository } from "./attributeTypes";
import { AttributeValidationsRepository } from "./attributeValidations";
import { BlockRepository } from "./blocks";
import { ServicesRepository } from "./services";
import { TransactionsRepository } from "./transactions";

const blocksRepository = new BlockRepository();
const transactionsRepository = new TransactionsRepository();
const attributesRepository = new AttributesRepository();
const attributeTypesRepository = new AttributeTypesRepository();
const attributeValidationsRepository = new AttributeValidationsRepository();
const servicesRepository = new ServicesRepository();

export {    blocksRepository, transactionsRepository, attributesRepository,
            attributeTypesRepository, attributeValidationsRepository, servicesRepository,

            BlockRepository, TransactionsRepository, AttributesRepository,
            AttributeTypesRepository, AttributeValidationsRepository, ServicesRepository
};
