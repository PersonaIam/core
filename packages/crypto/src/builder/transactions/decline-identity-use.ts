import { TransactionTypes } from "../../constants";
import { feeManager } from "../../managers";
import { IIdentityUseElement, ITransactionAsset, ITransactionData } from "../../models";
import { TransactionBuilder } from "./transaction";

export class DeclineIdentityUseBuilder extends TransactionBuilder<DeclineIdentityUseBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.DeclineIdentityUseRequest;
        this.data.fee = feeManager.get(TransactionTypes.DeclineIdentityUseRequest);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
        this.data.asset = { identityuse: [] } as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public identityUseAsset(identityuse: IIdentityUseElement[]): DeclineIdentityUseBuilder {
        this.data.asset.identityuse = identityuse;
        return this;
    }

    public getStruct(): ITransactionData {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): DeclineIdentityUseBuilder {
        return this;
    }
}
