import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const requestIdentityUse = joi => ({
    name: "requestIdentityUse",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.RequestIdentityUse)
            .required(),
        amount: joi
            .number()
            .only(0)
            .required(),
        asset: joi
            .object({
                identityuse: joi
                    .array()
                    .required(),
            })
            .required(),
        recipientId: joi
            .address()
            .required()
    }),
});
