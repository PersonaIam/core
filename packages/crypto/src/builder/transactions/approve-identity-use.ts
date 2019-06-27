import { TransactionTypes } from "../../constants";
import { feeManager } from "../../managers";
import { IIdentityUseElement, ITransactionAsset, ITransactionData } from "../../transactions";
import { TransactionBuilder } from "./transaction";

export class ApproveIdentityUseBuilder extends TransactionBuilder<ApproveIdentityUseBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.ApproveIdentityUseRequest;
        this.data.fee = feeManager.get(TransactionTypes.ApproveIdentityUseRequest);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
        this.data.asset = { identityuse: [] } as ITransactionAsset;
    }

    /**
     * Establish the asset.
     */
    public identityUseAsset(identityuse: IIdentityUseElement[]): ApproveIdentityUseBuilder {
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

    protected instance(): ApproveIdentityUseBuilder {
        return this;
    }
}
