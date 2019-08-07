import { Database, EventEmitter, TransactionPool } from "@arkecosystem/core-interfaces";
import {
    ITransactionData,
    RequestAttributeValidationTransaction,
    Transaction,
    TransactionConstructor,
} from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class RequestAttributeValidationTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return RequestAttributeValidationTransaction;
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
        validation.timestamp = transaction.data.timestamp;
        if (!validation.reason) {
            validation.reason = null;
        }
        if (!validation.validation_type) {
            validation.validation_type = null;
        }
        if (!validation.expire_timestamp) {
            validation.expire_timestamp = null;
        }
        validation.status = "PENDING_APPROVAL";
        await connection.saveAttributeValidationRequest(validation);
    };

    // tslint:disable-next-line:no-empty
    public revert(transaction: Transaction, wallet: Database.IWallet): void {}

    // tslint:disable-next-line:no-empty
    public emitEvents(transaction: Transaction, emitter: EventEmitter.EventEmitter): void {}

    public canEnterTransactionPool(data: ITransactionData, guard: TransactionPool.IGuard): boolean {
        return true;
    }
}
