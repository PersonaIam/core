/**
 * The Satoshi base.
 */
export const SATOSHI: number = 1e8;

/**
 * Alias of SATOSHI.
 */
export const ARKTOSHI: number = SATOSHI;

/**
 * Available transaction types.
 */

export enum TransactionTypes {
    Transfer = 0,
    SecondSignature = 1,
    DelegateRegistration = 2,
    Vote = 3,
    MultiSignature = 4,
    Ipfs = 5,
    TimelockTransfer = 6,
    MultiPayment = 7,
    DelegateResignation = 8,
    CreateAttribute = 9,
    UpdateAttribute = 10,
    RequestAttributeValidation = 11,
    ApproveAttributeValidationRequest = 12,
    DeclineAttributeValidationRequest = 13,
    NotarizeAttributeValidationRequest = 14,
    RejectAttributeValidationRequest = 15,
    CancelAttributeValidationRequest = 16,
    RequestIdentityUse = 17,
    ApproveIdentityUseRequest = 18,
    EndIdentityUseRequest = 19,
    CancelIdentityUseRequest = 20,
    DeclineIdentityUseRequest = 21,
    CreateService = 22,
    ActivateService = 23,
    InactivateService = 24,
}
