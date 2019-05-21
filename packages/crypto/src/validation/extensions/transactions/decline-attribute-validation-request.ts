import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const declineAttributeValidationRequest = joi => ({
    name: "declineAttributeValidationRequest",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.DeclineAttributeValidationRequest)
            .required(),
        amount: joi
            .number()
            .only(0)
            .required(),
        asset: joi
            .object({
                validation: joi
                    .array()
                    .required(),
            })
            .required(),
        recipientId: joi
            .address()
            .required()
    }),
});
