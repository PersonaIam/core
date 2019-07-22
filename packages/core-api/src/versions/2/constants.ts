export const constants = {
    // business related constants
    MONTHS_FOR_ACTIVE_VALIDATION: 12, // The number of months for which a validation remains active ( is taken into consideration when determining the status of the attribute )
    FIRST_NOTARIZATION_BATCH_SIZE: 7, // The size of the validation "batch" considered for determining the active/inactive status of an attribute if no 3 notarizations in a row can be obtained
    MIN_NOTARIZATIONS_IN_A_ROW: 3, // The number of notarizations in a row that "delete" existing red flags
    MIN_RED_FLAGS_IN_A_ROW_FOR_REJECTED: 3, // The maximum number of red flags (REJECTED validations with no subsequent COMPLETED validations) for the attribute to not immediately be rejected
    REWARD_FAUCET: "LMs6hQAcRYmQk4vGHgE2PndcXWZxc2Du3w",
    REWARD_FAUCET_KEY: "025dfd3954bf009a65092cfd3f0ba718d0eb2491dd62c296a1fff6de8ccd4afed6",
    REWARD_ROUND_INTERVAL: 1, // TBD 1 hour in milliseconds
    MAX_SERVICE_DESCRIPTION_LENGTH: 63,

    shareStatus: {
        UNAPPROVED: 0,
        APPROVED: 1,
        COMPLETED: 2,
    },
    validationRequestStatus: {
        PENDING_APPROVAL: "PENDING_APPROVAL",
        IN_PROGRESS: "IN_PROGRESS",
        DECLINED: "DECLINED",
        COMPLETED: "COMPLETED",
        REJECTED: "REJECTED",
        CANCELED: "CANCELED",
    },
    validationRequestActions: {
        DECLINE: "DECLINE",
        APPROVE: "APPROVE",
        NOTARIZE: "NOTARIZE",
        REJECT: "REJECT",
        CANCEL: "CANCEL",
    },
    validationRequestValidatorActions: {
        DECLINE: "DECLINE",
        APPROVE: "APPROVE",
        NOTARIZE: "NOTARIZE",
        REJECT: "REJECT",
    },
    validationRequestOwnerActions: {
        CANCEL: "CANCEL",
    },
    validationType: {
        FACE_TO_FACE: "FACE_TO_FACE",
        REMOTE: "REMOTE",
    },
    serviceStatus: {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
    },

    identityUseRequestStatus: {
        PENDING_APPROVAL: "PENDING_APPROVAL",
        ACTIVE: "ACTIVE",
        DECLINED: "DECLINED",
        ENDED: "ENDED",
        CANCELED: "CANCELED",
        REJECTED: "REJECTED",
    },
    identityUseRequestActions: {
        APPROVE: "APPROVE",
        DECLINE: "DECLINE",
        END: "END",
        CANCEL: "CANCEL",
    },
    identityUseRequestProviderActions: {
        APPROVE: "APPROVE",
        DECLINE: "DECLINE",
    },
    identityUseRequestOwnerActions: {
        END: "END",
        CANCEL: "CANCEL",
    },
};
