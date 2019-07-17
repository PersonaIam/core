import BigNumber from "bignumber.js";
import { TransactionTypes } from "../../../enums";
import { IServiceElement, ITransactionAsset, ITransactionData } from "../../../interfaces";
import { feeManager } from "../../../managers";
import { TransactionBuilder } from "./transaction";

export class ActivateServiceBuilder extends TransactionBuilder<ActivateServiceBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.ActivateService;
        this.data.fee = feeManager.get(TransactionTypes.ActivateService);
        this.data.amount = new BigNumber(0);
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { service: {} } as ITransactionAsset;
    }

    /**
     * Establish the service on the asset.
     */
    public serviceAsset(service: IServiceElement): ActivateServiceBuilder {
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

    protected instance(): ActivateServiceBuilder {
        return this;
    }
}
