import BigNumber from "bignumber.js";
import { TransactionTypes } from "../../../enums";
import { IAttributeElement, ITransactionAsset, ITransactionData } from "../../../interfaces";
import { feeManager } from "../../../managers";
import { TransactionBuilder } from "./transaction";

export class UpdateAttributeBuilder extends TransactionBuilder<UpdateAttributeBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.UpdateAttribute;
        this.data.fee = feeManager.get(TransactionTypes.UpdateAttribute);
        this.data.amount = new BigNumber(0);
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { attribute: [] } as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public attributesAsset(attributes: IAttributeElement[]): UpdateAttributeBuilder {
        this.data.asset.attribute = attributes;
        return this;
    }

    public getStruct(): ITransactionData {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): UpdateAttributeBuilder {
        return this;
    }
}
