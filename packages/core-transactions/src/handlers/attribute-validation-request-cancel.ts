import { Database, EventEmitter, TransactionPool } from "@arkecosystem/core-interfaces";
import {
    CancelAttributeValidationRequestTransaction,
    ITransactionData,
    Transaction,
    TransactionConstructor,
} from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class RequestAttributeValidationCancelTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return CancelAttributeValidationRequestTransaction;
    }

    public canBeApplied(
        transaction: Transaction,
        wallet: Database.IWallet,
        walletManager?: Database.IWalletManager,
    ): boolean {
        return super.canBeApplied(transaction, wallet, walletManager);
    }

    // tslint:disable-next-line:no-empty
    public apply(transaction: Transaction, wallet: Database.IWallet): void {}

    // tslint:disable-next-line:no-empty
    public applyToDB = async (transaction: Transaction, connection: Database.IConnection) => {
        const validation = transaction.data.asset.validation[0];
        validation.timestamp = transaction.timestamp;
        if (!validation.reason) {
            validation.reason = null;
        }
        if (!validation.validation_type) {
            validation.validation_type = null;
        }
        if (!validation.expire_timestamp) {
            validation.expire_timestamp = null;
        }
        validation.status = "CANCELED";
        await connection.updateAttributeValidationRequest(validation);
        await connection.addAttributeValidationRequestAction({
            id: validation.id,
            action: "CANCEL",
            timestamp: transaction.timestamp,
        });
    };

    // tslint:disable-next-line:no-empty
    public revert(transaction: Transaction, wallet: Database.IWallet): void {}

    // tslint:disable-next-line:no-empty
    public emitEvents(transaction: Transaction, emitter: EventEmitter.EventEmitter): void {}

    public canEnterTransactionPool(data: ITransactionData, guard: TransactionPool.IGuard): boolean {
        return true;
    }
}
