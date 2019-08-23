import { Database, EventEmitter, State, TransactionPool } from "@arkecosystem/core-interfaces";
import { Interfaces, Transactions } from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class CreateAttributeTransactionHandler extends TransactionHandler {
    public getConstructor(): Transactions.TransactionConstructor {
        return Transactions.CreateAttributeTransaction;
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
        const attribute = transaction.data.asset.attribute[0];
        attribute.timestamp = transaction.data.timestamp;
        await connection.saveAttribute(attribute);
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
