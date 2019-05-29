import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const createService = joi => ({
    name: "createService",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.CreateService)
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
