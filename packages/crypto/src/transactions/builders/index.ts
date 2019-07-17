import { DelegateRegistrationBuilder } from "./transactions/delegate-registration";
import { DelegateResignationBuilder } from "./transactions/delegate-resignation";
import { IPFSBuilder } from "./transactions/ipfs";
import { MultiPaymentBuilder } from "./transactions/multi-payment";
import { MultiSignatureBuilder } from "./transactions/multi-signature";
import { SecondSignatureBuilder } from "./transactions/second-signature";
import { TimelockTransferBuilder } from "./transactions/timelock-transfer";
import { TransferBuilder } from "./transactions/transfer";
import { VoteBuilder } from "./transactions/vote";

import { ActivateServiceBuilder } from "./transactions/activate-service";
import { ApproveAttributeValidationBuilder } from "./transactions/approve-attribute-validation";
import { ApproveIdentityUseBuilder } from "./transactions/approve-identity-use";
import { CancelAttributeValidationBuilder } from "./transactions/cancel-attribute-validation";
import { CancelIdentityUseBuilder } from "./transactions/cancel-identity-use";
import { CreateAttributeBuilder } from "./transactions/create-attribute";
import { CreateAttributeValidationBuilder } from "./transactions/create-attribute-validation";
import { CreateIdentityUseBuilder } from "./transactions/create-identity-use";
import { CreateServiceBuilder } from "./transactions/create-service";
import { DeclineAttributeValidationBuilder } from "./transactions/decline-attribute-validation";
import { DeclineIdentityUseBuilder } from "./transactions/decline-identity-use";
import { EndIdentityUseBuilder } from "./transactions/end-identity-use";
import { InactivateServiceBuilder } from "./transactions/inactivate-service";
import { NotarizeAttributeValidationBuilder } from "./transactions/notarize-attribute-validation";
import { RejectAttributeValidationBuilder } from "./transactions/reject-attribute-validation";
import { UpdateAttributeBuilder } from "./transactions/update-attribute";

export class BuilderFactory {
    public static transfer(): TransferBuilder {
        return new TransferBuilder();
    }

    public static secondSignature(): SecondSignatureBuilder {
        return new SecondSignatureBuilder();
    }

    public static delegateRegistration(): DelegateRegistrationBuilder {
        return new DelegateRegistrationBuilder();
    }

    public static vote(): VoteBuilder {
        return new VoteBuilder();
    }

    public static multiSignature(): MultiSignatureBuilder {
        return new MultiSignatureBuilder();
    }

    public static ipfs(): IPFSBuilder {
        return new IPFSBuilder();
    }

    public static timelockTransfer(): TimelockTransferBuilder {
        return new TimelockTransferBuilder();
    }

    public static multiPayment(): MultiPaymentBuilder {
        return new MultiPaymentBuilder();
    }

    public static delegateResignation(): DelegateResignationBuilder {
        return new DelegateResignationBuilder();
    }

    /**
     * Create new create attribute transaction type.
     */
    public static createAttribute(): CreateAttributeBuilder {
        return new CreateAttributeBuilder();
    }

    /**
     * Create new update attribute transaction type.
     */
    public static updateAttribute(): UpdateAttributeBuilder {
        return new UpdateAttributeBuilder();
    }

    /**
     * Create new create attribute validation request transaction type.
     */
    public static requestAttributeValidation(): CreateAttributeValidationBuilder {
        return new CreateAttributeValidationBuilder();
    }

    /**
     * Create new approve attribute validation request transaction type.
     */
    public static approveAttributeValidationRequest(): ApproveAttributeValidationBuilder {
        return new ApproveAttributeValidationBuilder();
    }

    /**
     * Create new reject attribute validation request transaction type.
     */
    public static rejectAttributeValidationRequest(): RejectAttributeValidationBuilder {
        return new RejectAttributeValidationBuilder();
    }

    /**
     * Create new decline attribute validation request transaction type.
     */
    public static declineAttributeValidationRequest(): DeclineAttributeValidationBuilder {
        return new DeclineAttributeValidationBuilder();
    }

    /**
     * Create new notarize attribute validation request transaction type.
     */
    public static notarizeAttributeValidationRequest(): NotarizeAttributeValidationBuilder {
        return new NotarizeAttributeValidationBuilder();
    }

    /**
     * Create new cancel attribute validation request transaction type.
     */
    public static cancelAttributeValidationRequest(): CancelAttributeValidationBuilder {
        return new CancelAttributeValidationBuilder();
    }

    /**
     * Create new create service transaction type.
     */
    public static createService(): CreateServiceBuilder {
        return new CreateServiceBuilder();
    }

    /**
     * Create new activate service transaction type.
     */
    public static activateService(): ActivateServiceBuilder {
        return new ActivateServiceBuilder();
    }

    /**
     * Create new inactivate service transaction type.
     */
    public static inactivateService(): InactivateServiceBuilder {
        return new InactivateServiceBuilder();
    }

    /**
     * Create new request identity use transaction type.
     */
    public static requestIdentityUse(): CreateIdentityUseBuilder {
        return new CreateIdentityUseBuilder();
    }

    /**
     * Create new approve identity use request transaction type.
     */
    public static approveIdentityUseRequest(): ApproveIdentityUseBuilder {
        return new ApproveIdentityUseBuilder();
    }

    /**
     * Create new end identity use request transaction type.
     */
    public static endIdentityUseRequest(): EndIdentityUseBuilder {
        return new EndIdentityUseBuilder();
    }

    /**
     * Create new decline identity use request transaction type.
     */
    public static declineIdentityUseRequest(): DeclineIdentityUseBuilder {
        return new DeclineIdentityUseBuilder();
    }

    /**
     * Create new cancel identity use request transaction type.
     */
    public static cancelIdentityUseRequest(): CancelIdentityUseBuilder {
        return new CancelIdentityUseBuilder();
    }
}
