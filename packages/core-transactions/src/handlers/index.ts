import { DelegateRegistrationTransactionHandler } from "./delegate-registration";
import { DelegateResignationTransactionHandler } from "./delegate-resignation";
import { IpfsTransactionHandler } from "./ipfs";
import { MultiPaymentTransactionHandler } from "./multi-payment";
import { MultiSignatureTransactionHandler } from "./multi-signature";
import { SecondSignatureTransactionHandler } from "./second-signature";
import { TimelockTransferTransactionHandler } from "./timelock-transfer";
import { TransferTransactionHandler } from "./transfer";
import { VoteTransactionHandler } from "./vote";

import { ActivateServiceTransactionHandler } from "./activate-service";
import { CreateAttributeTransactionHandler } from "./create-attribute";
import { CreateServiceTransactionHandler } from "./create-service";
import { InactivateServiceTransactionHandler } from "./inactivate-service";

import { RequestAttributeValidationTransactionHandler } from "./attribute-validation-request";
import { RequestAttributeValidationApproveTransactionHandler } from "./attribute-validation-request-approve";
import { RequestAttributeValidationCancelTransactionHandler } from "./attribute-validation-request-cancel";
import { RequestAttributeValidationDeclineTransactionHandler } from "./attribute-validation-request-decline";
import { RequestAttributeValidationNotarizeTransactionHandler } from "./attribute-validation-request-notarize";
import { RequestAttributeValidationRejectTransactionHandler } from "./attribute-validation-request-reject";

import { RequestIdentityUseApproveTransactionHandler } from "./identity-use-approve";
import { RequestIdentityUseCancelTransactionHandler } from "./identity-use-cancel";
import { RequestIdentityUseDeclineTransactionHandler } from "./identity-use-decline";
import { RequestIdentityUseEndTransactionHandler } from "./identity-use-end";
import { RequestIdentityUseTransactionHandler } from "./identity-use-request";
import { UpdateAttributeTransactionHandler } from "./update-attribute";

export const transactionHandlers = [
    TransferTransactionHandler,
    SecondSignatureTransactionHandler,
    VoteTransactionHandler,
    DelegateRegistrationTransactionHandler,
    MultiSignatureTransactionHandler,
    IpfsTransactionHandler,
    TimelockTransferTransactionHandler,
    MultiPaymentTransactionHandler,
    DelegateResignationTransactionHandler,
    CreateAttributeTransactionHandler,
    UpdateAttributeTransactionHandler,
    RequestAttributeValidationTransactionHandler,
    RequestAttributeValidationApproveTransactionHandler,
    RequestAttributeValidationDeclineTransactionHandler,
    RequestAttributeValidationRejectTransactionHandler,
    RequestAttributeValidationNotarizeTransactionHandler,
    RequestAttributeValidationCancelTransactionHandler,
    RequestIdentityUseTransactionHandler,
    RequestIdentityUseApproveTransactionHandler,
    RequestIdentityUseDeclineTransactionHandler,
    RequestIdentityUseEndTransactionHandler,
    RequestIdentityUseCancelTransactionHandler,
    CreateServiceTransactionHandler,
    ActivateServiceTransactionHandler,
    InactivateServiceTransactionHandler,
];
