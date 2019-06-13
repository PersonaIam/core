import { TransactionTypes } from "../../constants";
import { feeManager } from "../../managers";
import { TransactionBuilder } from "./transaction";
import { ITransactionAsset, ITransactionData, IIdentityUseElement} from "../../models";

export class EndIdentityUseBuilder extends TransactionBuilder<EndIdentityUseBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.EndIdentityUseRequest;
        this.data.fee = feeManager.get(TransactionTypes.EndIdentityUseRequest);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
        this.data.asset = { identityuse: [] }  as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public identityUseAsset(identityuse: IIdentityUseElement[]): EndIdentityUseBuilder {
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

    protected instance(): EndIdentityUseBuilder {
        return this;
    }
}
