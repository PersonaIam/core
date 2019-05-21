import { TransactionTypes } from "../../constants";
import { crypto } from "../../crypto";
import { feeManager } from "../../managers";
import { TransactionBuilder } from "./transaction";
import { ITransactionAsset, ITransactionData, IAttributeValidationElement} from "../../models";
import { VoteBuilder } from "./vote";

export class CreateAttributeValidationBuilder extends TransactionBuilder<CreateAttributeValidationBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.RequestAttributeValidation;
        this.data.fee = feeManager.get(TransactionTypes.RequestAttributeValidation);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
        this.data.asset = { validation: [] }  as ITransactionAsset;
    }

    /**
     * Establish the attributes on the asset.
     */
    public validationAsset(validation: IAttributeValidationElement[]): CreateAttributeValidationBuilder {
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

    protected instance(): CreateAttributeValidationBuilder {
        return this;
    }
}
