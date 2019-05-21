import { delegateRegistration } from "./delegate-registration";
import { delegateResignation } from "./delegate-resignation";
import { ipfs } from "./ipfs";
import { multiPayment } from "./multi-payment";
import { multiSignature } from "./multi-signature";
import { secondSignature } from "./second-signature";
import { timelockTransfer } from "./timelock-transfer";
import { transfer } from "./transfer";
import { vote } from "./vote";
import { createAttribute } from "./create-attribute";
import { updateAttribute } from "./update-attribute";
import { requestAttributeValidation } from "./request-attribute-validation";
import { approveAttributeValidationRequest} from "./approve-attribute-validation-request";
import { declineAttributeValidationRequest} from "./decline-attribute-validation-request";
import { notarizeAttributeValidationRequest} from "./notarize-attribute-validation-request";
import { rejectAttributeValidationRequest} from "./reject-attribute-validation-request";
import { cancelAttributeValidationRequest} from "./cancel-attribute-validation-request";

export const transactions = [
    transfer,
    secondSignature,
    delegateRegistration,
    vote,
    multiSignature,
    ipfs,
    timelockTransfer,
    multiPayment,
    delegateResignation,
    createAttribute,
    updateAttribute,
    requestAttributeValidation,
    approveAttributeValidationRequest,
    declineAttributeValidationRequest,
    notarizeAttributeValidationRequest,
    rejectAttributeValidationRequest,
    cancelAttributeValidationRequest
];
