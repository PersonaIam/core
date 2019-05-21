export const constants = {
    validationRequestValidatorActions : {
        DECLINE : 'DECLINE',
        APPROVE : 'APPROVE',
        NOTARIZE : 'NOTARIZE',
        REJECT : 'REJECT',
    },
    validationRequestOwnerActions : {
        CANCEL : 'CANCEL'
    },
    validationRequestActions : {
        DECLINE : 'DECLINE',
        APPROVE : 'APPROVE',
        NOTARIZE : 'NOTARIZE',
        REJECT : 'REJECT',
        CANCEL : 'CANCEL'
    },
    validationRequestStatus : {
        PENDING_APPROVAL : 'PENDING_APPROVAL',
        IN_PROGRESS : 'IN_PROGRESS',
        DECLINED : 'DECLINED',
        COMPLETED : 'COMPLETED',
        REJECTED: 'REJECTED',
        CANCELED : 'CANCELED'
    },
    validationType : {
        FACE_TO_FACE : 'FACE_TO_FACE',
        REMOTE : 'REMOTE'
    },
    MONTHS_FOR_ACTIVE_VALIDATION : 12, // The number of months for which a validation remains active ( is taken into consideration when determining the status of the attribute )


};
