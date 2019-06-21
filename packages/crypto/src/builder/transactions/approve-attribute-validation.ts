import { TransactionTypes } from "../../constants";
import { crypto } from "../../crypto";
import { feeManager } from "../../managers";
import { IAttributeValidationElement, ITransactionAsset, ITransactionData } from "../../models";
import { TransactionBuilder } from "./transaction";
import { VoteBuilder } from "./vote";

export class ApproveAttributeValidationBuilder extends TransactionBuilder<ApproveAttributeValidationBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.ApproveAttributeValidationRequest;
        this.data.fee = feeManager.get(TransactionTypes.ApproveAttributeValidationRequest);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
        this.data.asset = { validation: [] } as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public validationAsset(validation: IAttributeValidationElement[]): ApproveAttributeValidationBuilder {
        this.data.asset.validation = validation;
        return this;
    }

    public getStruct(): ITransactionData {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): ApproveAttributeValidationBuilder {
        return this;
    }
}
