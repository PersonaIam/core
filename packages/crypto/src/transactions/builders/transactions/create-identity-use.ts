import BigNumber from "bignumber.js";
import { TransactionTypes } from "../../../enums";
import { IIdentityUseElement, ITransactionAsset, ITransactionData } from "../../../interfaces";
import { feeManager } from "../../../managers";
import { TransactionBuilder } from "./transaction";

export class CreateIdentityUseBuilder extends TransactionBuilder<CreateIdentityUseBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.RequestIdentityUse;
        this.data.fee = feeManager.get(TransactionTypes.RequestIdentityUse);
        this.data.amount = new BigNumber(0);
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { identityuse: [] } as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public identityUseAsset(identityUse: IIdentityUseElement[]): CreateIdentityUseBuilder {
        this.data.asset.identityuse = identityUse;
        return this;
    }

    public getStruct(): ITransactionData {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): CreateIdentityUseBuilder {
        return this;
    }
}
