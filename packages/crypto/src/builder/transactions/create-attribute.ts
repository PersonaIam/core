import { TransactionTypes } from "../../constants";
import { crypto } from "../../crypto";
import { feeManager } from "../../managers";
import { IAttributeElement, ITransactionAsset, ITransactionData } from "../../models";
import { TransactionBuilder } from "./transaction";
import { VoteBuilder } from "./vote";

export class CreateAttributeBuilder extends TransactionBuilder<CreateAttributeBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.CreateAttribute;
        this.data.fee = feeManager.get(TransactionTypes.CreateAttribute);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
        this.data.asset = { attribute: [] } as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public attributesAsset(attributes: IAttributeElement[]): CreateAttributeBuilder {
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

    protected instance(): CreateAttributeBuilder {
        return this;
    }
}
