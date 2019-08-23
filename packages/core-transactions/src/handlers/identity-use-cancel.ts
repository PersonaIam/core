import { Database, EventEmitter, State, TransactionPool } from "@arkecosystem/core-interfaces";
import { Interfaces, Transactions } from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class RequestIdentityUseCancelTransactionHandler extends TransactionHandler {
    public getConstructor(): Transactions.TransactionConstructor {
        return Transactions.CancelIdentityUseRequestTransaction;
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
        const identityUse = transaction.data.asset.identityuse[0];
        identityUse.timestamp = transaction.data.timestamp;
        if (!identityUse.reason) {
            identityUse.reason = undefined;
        }
        identityUse.status = "CANCELED";
        await connection.updateIdentityUseRequest(identityUse);
        await connection.addIdentityUseRequestAction({
            id: identityUse.id,
            action: "CANCEL",
            timestamp: transaction.data.timestamp,
        });
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
