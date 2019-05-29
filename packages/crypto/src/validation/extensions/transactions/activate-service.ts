import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const activateService = joi => ({
    name: "activateService",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.ActivateService)
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
