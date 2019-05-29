import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const inactivateService = joi => ({
    name: "inactivateService",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.InactivateService)
            .required(),
        amount: joi
            .number()
            .only(0)
            .required(),
        asset: joi
            .object({
                service: joi
                    .required(),
            })
            .required(),
        recipientId: joi
            .address()
            .required()
    }),
});
