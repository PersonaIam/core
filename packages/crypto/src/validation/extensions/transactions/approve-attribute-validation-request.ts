import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const approveAttributeValidationRequest = joi => ({
    name: "approveAttributeValidationRequest",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.ApproveAttributeValidationRequest)
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
