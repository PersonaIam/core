import { Database, EventEmitter, State, TransactionPool } from "@arkecosystem/core-interfaces";
import { Interfaces, Transactions } from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class RequestAttributeValidationTransactionHandler extends TransactionHandler {
    public getConstructor(): Transactions.TransactionConstructor {
        return Transactions.RequestAttributeValidationTransaction;
    }

    public canBeApplied(
        transaction: Interfaces.ITransaction,
        wallet: State.IWallet,
        databaseWalletManager: State.IWalletManager,
    ): boolean {
        return super.canBeApplied(transaction, wallet, databaseWalletManager);
    }
    // tslint:disable-next-line:no-empty
    public applyToDB = async (transaction: Interfaces.ITransaction, connection: Database.IConnection) => {
        const validation = transaction.data.asset.validation[0];
        validation.timestamp = transaction.data.timestamp;
        if (!validation.reason) {
            validation.reason = undefined;
        }
        if (!validation.validation_type) {
            validation.validation_type = undefined;
        }
        if (!validation.expire_timestamp) {
            validation.expire_timestamp = undefined;
        }
        validation.status = "PENDING_APPROVAL";
        await connection.saveAttributeValidationRequest(validation);
    };

    // tslint:disable-next-line:no-empty
    public async bootstrap(connection: Database.IConnection, walletManager: State.IWalletManager): Promise<void> {}

    // tslint:disable-next-line:no-empty
    public emitEvents(transaction: Interfaces.ITransaction, emitter: EventEmitter.EventEmitter): void {}

    public canEnterTransactionPool(
        data: Interfaces.ITransactionData,
        pool: TransactionPool.IConnection,
        processor: TransactionPool.IProcessor,
    ): boolean {
        return true;
    }
    protected applyToRecipient(transaction: Interfaces.ITransaction, walletManager: State.IWalletManager): void {
        return;
    }

    protected revertForRecipient(transaction: Interfaces.ITransaction, walletManager: State.IWalletManager): void {
        return;
    }
}
