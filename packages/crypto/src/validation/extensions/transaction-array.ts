export const transactionArray = joi => ({
    name: "transactionArray",
    base: joi
        .array()
        .items(
            joi
                .alternatives()
                .try(
                    joi.transfer(),
                    joi.secondSignature(),
                    joi.delegateRegistration(),
                    joi.vote(),
                    joi.multiSignature(),
                    joi.createAttribute(),
                    joi.updateAttribute(),
                    joi.requestAttributeValidation(),
                    joi.approveAttributeValidationRequest(),
                    joi.declineAttributeValidationRequest(),
                    joi.notarizeAttributeValidationRequest(),
                    joi.rejectAttributeValidationRequest(),
                    joi.cancelAttributeValidationRequest(),
                    joi.createService(),
                    joi.activateService(),
                    joi.inactivateService()
                ),
        ),
});
