import { AttributesRepository } from "./attributes";
import { AttributeTypesRepository } from "./attributeTypes";
import { AttributeValidationsRepository } from "./attributeValidations";
import { BlockRepository } from "./blocks";
import { TransactionsRepository } from "./transactions";

const blocksRepository = new BlockRepository();
const transactionsRepository = new TransactionsRepository();
const attributesRepository = new AttributesRepository();
const attributeTypesRepository = new AttributeTypesRepository();
const attributeValidationsRepository = new AttributeValidationsRepository();

export { blocksRepository, transactionsRepository, attributesRepository, attributeTypesRepository, attributeValidationsRepository,
         BlockRepository, TransactionsRepository, AttributesRepository, AttributeTypesRepository, AttributeValidationsRepository };
