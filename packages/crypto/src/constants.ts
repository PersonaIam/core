/**
 * The Arktoshi base.
 */
export const ARKTOSHI: number = 1e8;

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
    CancelAttributeValidationRequest = 16
    // RequestIdentityUse = 108,
    // ApproveIdentityUseRequest = 109,
    // EndIdentityUseRequest = 110,
    // CancelIdentityUseRequest = 111,
    // DeclineIdentityUseRequest = 112,
    // ConsumeAttribute = 113,
    // RunRewardRound = 114,
    // Reward = 115,
    // UpdateRewardRoundToComplete = 116,
    // CreateService = 117,
    // InactivateService = 118,
    // ActivateService = 119
}
