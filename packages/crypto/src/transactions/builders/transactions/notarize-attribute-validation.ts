import BigNumber from "bignumber.js";
import { TransactionTypes } from "../../../enums";
import { IAttributeValidationElement, ITransactionAsset, ITransactionData } from "../../../interfaces";
import { feeManager } from "../../../managers";
import { TransactionBuilder } from "./transaction";

export class NotarizeAttributeValidationBuilder extends TransactionBuilder<NotarizeAttributeValidationBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.NotarizeAttributeValidationRequest;
        this.data.fee = feeManager.get(TransactionTypes.NotarizeAttributeValidationRequest);
        this.data.amount = new BigNumber(0);
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { validation: [] } as ITransactionAsset;
    }

    /**
     * Establish the validation on the asset.
     */
    public validationAsset(validation: IAttributeValidationElement[]): NotarizeAttributeValidationBuilder {
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

    protected instance(): NotarizeAttributeValidationBuilder {
        return this;
    }
}
