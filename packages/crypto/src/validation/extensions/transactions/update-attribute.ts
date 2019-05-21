import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const updateAttribute = joi => ({
    name: "updateAttribute",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.UpdateAttribute)
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
