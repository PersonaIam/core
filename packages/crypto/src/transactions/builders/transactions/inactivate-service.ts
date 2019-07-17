import BigNumber from "bignumber.js";
import { TransactionTypes } from "../../../enums";
import { IServiceElement, ITransactionAsset, ITransactionData } from "../../../interfaces";
import { feeManager } from "../../../managers";
import { TransactionBuilder } from "./transaction";

export class InactivateServiceBuilder extends TransactionBuilder<InactivateServiceBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.InactivateService;
        this.data.fee = feeManager.get(TransactionTypes.InactivateService);
        this.data.amount = new BigNumber(0);
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { service: {} } as ITransactionAsset;
    }

    /**
     * Establish the service on the asset.
     */
    public serviceAsset(service: IServiceElement): InactivateServiceBuilder {
        this.data.asset.service = service;
        return this;
    }

    public getStruct(): ITransactionData {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): InactivateServiceBuilder {
        return this;
    }
}
