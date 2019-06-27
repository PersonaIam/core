import { TransactionTypes } from "../../constants";
import { feeManager } from "../../managers";
import { IServiceElement, ITransactionAsset, ITransactionData } from "../../transactions";
import { TransactionBuilder } from "./transaction";

export class ActivateServiceBuilder extends TransactionBuilder<ActivateServiceBuilder> {
    constructor() {
        super();

        this.data.type = TransactionTypes.ActivateService;
        this.data.fee = feeManager.get(TransactionTypes.ActivateService);
        this.data.amount = 0;
        this.data.recipientId = null;
        this.data.senderPublicKey = null;
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
