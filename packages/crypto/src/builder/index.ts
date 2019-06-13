import { CreateAttributeBuilder } from "./transactions/create-attribute";
import { UpdateAttributeBuilder } from "./transactions/update-attribute";
import { ApproveAttributeValidationBuilder } from "./transactions/approve-attribute-validation";
import { RejectAttributeValidationBuilder } from "./transactions/reject-attribute-validation";
import { DeclineAttributeValidationBuilder } from "./transactions/decline-attribute-validation";
import { NotarizeAttributeValidationBuilder } from "./transactions/notarize-attribute-validation";
import { CancelAttributeValidationBuilder } from "./transactions/cancel-attribute-validation";
import { CreateAttributeValidationBuilder } from "./transactions/create-attribute-validation";
import { CreateServiceBuilder } from "./transactions/create-service";
import { ActivateServiceBuilder } from "./transactions/activate-service";
import { InactivateServiceBuilder } from "./transactions/inactivate-service";
import { ApproveIdentityUseBuilder } from "./transactions/approve-identity-use";
import { EndIdentityUseBuilder } from "./transactions/end-identity-use";
import { DeclineIdentityUseBuilder } from "./transactions/decline-identity-use";
import { CancelIdentityUseBuilder } from "./transactions/cancel-identity-use";
import { CreateIdentityUseBuilder } from "./transactions/create-identity-use";

import { DelegateRegistrationBuilder } from "./transactions/delegate-registration";
import { DelegateResignationBuilder } from "./transactions/delegate-resignation";
import { IPFSBuilder } from "./transactions/ipfs";
import { MultiPaymentBuilder } from "./transactions/multi-payment";
import { MultiSignatureBuilder } from "./transactions/multi-signature";
import { SecondSignatureBuilder } from "./transactions/second-signature";
import { TimelockTransferBuilder } from "./transactions/timelock-transfer";
import { TransferBuilder } from "./transactions/transfer";
import { VoteBuilder } from "./transactions/vote";

export class TransactionBuilderFactory {
    /**
     * Create new transfer transaction type.
     */
    public transfer(): TransferBuilder {
        return new TransferBuilder();
    }

    /**
     * Create new second signature transaction type.
     */
    public secondSignature(): SecondSignatureBuilder {
        return new SecondSignatureBuilder();
    }

    /**
     * Create new delegate transaction type.
     */
    public delegateRegistration(): DelegateRegistrationBuilder {
        return new DelegateRegistrationBuilder();
    }

    /**
     * Create new vote transaction type.
     */
    public vote(): VoteBuilder {
        return new VoteBuilder();
    }

    /**
     * Create new multi-signature transaction type.
     */
    public multiSignature(): MultiSignatureBuilder {
        return new MultiSignatureBuilder();
    }

    /**
     * Create new IPFS transaction type.
     */
    public ipfs(): IPFSBuilder {
        return new IPFSBuilder();
    }

    /**
     * Create new timelock transfer transaction type.
     */
    public timelockTransfer(): TimelockTransferBuilder {
        return new TimelockTransferBuilder();
    }

    /**
     * Create new multi-payment transaction type.
     */
    public multiPayment(): MultiPaymentBuilder {
        return new MultiPaymentBuilder();
    }

    /**
     * Create new delegate resignation transaction type.
     */
    public delegateResignation(): DelegateResignationBuilder {
        return new DelegateResignationBuilder();
    }

    /**
     * Create new create attribute transaction type.
     */
    public createAttribute(): CreateAttributeBuilder {
        return new CreateAttributeBuilder();
    }

    /**
     * Create new update attribute transaction type.
     */
    public updateAttribute(): UpdateAttributeBuilder {
        return new UpdateAttributeBuilder();
    }

    /**
     * Create new create attribute validation request transaction type.
     */
    public requestAttributeValidation(): CreateAttributeValidationBuilder {
        return new CreateAttributeValidationBuilder();
    }

    /**
     * Create new approve attribute validation request transaction type.
     */
    public approveAttributeValidationRequest(): ApproveAttributeValidationBuilder {
        return new ApproveAttributeValidationBuilder();
    }

    /**
     * Create new reject attribute validation request transaction type.
     */
    public rejectAttributeValidationRequest(): RejectAttributeValidationBuilder    {
        return new RejectAttributeValidationBuilder();
    }

    /**
     * Create new decline attribute validation request transaction type.
     */
    public declineAttributeValidationRequest(): DeclineAttributeValidationBuilder {
        return new DeclineAttributeValidationBuilder();
    }

    /**
     * Create new notarize attribute validation request transaction type.
     */
    public notarizeAttributeValidationRequest(): NotarizeAttributeValidationBuilder {
        return new NotarizeAttributeValidationBuilder();
    }

    /**
     * Create new cancel attribute validation request transaction type.
     */
    public cancelAttributeValidationRequest(): CancelAttributeValidationBuilder {
        return new CancelAttributeValidationBuilder();
    }

    /**
     * Create new create service transaction type.
     */
    public createService(): CreateServiceBuilder {
        return new CreateServiceBuilder();
    }

    /**
     * Create new activate service transaction type.
     */
    public activateService(): ActivateServiceBuilder {
        return new ActivateServiceBuilder();
    }

    /**
     * Create new inactivate service transaction type.
     */
    public inactivateService(): InactivateServiceBuilder {
        return new InactivateServiceBuilder();
    }

    /**
     * Create new request identity use transaction type.
     */
    public requestIdentityUse(): CreateIdentityUseBuilder {
        return new CreateIdentityUseBuilder();
    }

    /**
     * Create new approve identity use request transaction type.
     */
    public approveIdentityUseRequest(): ApproveIdentityUseBuilder {
        return new ApproveIdentityUseBuilder();
    }

    /**
     * Create new end identity use request transaction type.
     */
    public endIdentityUseRequest(): EndIdentityUseBuilder    {
        return new EndIdentityUseBuilder();
    }

    /**
     * Create new decline identity use request transaction type.
     */
    public declineIdentityUseRequest(): DeclineIdentityUseBuilder {
        return new DeclineIdentityUseBuilder();
    }

    /**
     * Create new cancel identity use request transaction type.
     */
    public cancelIdentityUseRequest(): CancelIdentityUseBuilder {
        return new CancelIdentityUseBuilder();
    }
}

export const transactionBuilder = new TransactionBuilderFactory();
