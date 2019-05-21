import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const createAttribute = joi => ({
    name: "createAttribute",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.CreateAttribute)
            .required(),
        amount: joi
            .number()
            .only(0)
            .required(),
        asset: joi
            .object({
                attribute: joi
                    .array()
                    .required(),
            })
            .required(),
        recipientId: joi
            .address()
            .required()
    }),
});
