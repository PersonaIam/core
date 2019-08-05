import { Database, EventEmitter, TransactionPool } from "@arkecosystem/core-interfaces";
import { CreateServiceTransaction, ITransactionData, Transaction, TransactionConstructor } from "@arkecosystem/crypto";

import { TransactionHandler } from "./transaction";

export class CreateServiceTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return CreateServiceTransaction;
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
        const service = transaction.data.asset.service;
        service.timestamp = transaction.timestamp;
        service.status = "ACTIVE";
        service.attribute_types = JSON.stringify(service.attribute_types);
        await connection.saveService(service);
    };

    // tslint:disable-next-line:no-empty
    public revert(transaction: Transaction, wallet: Database.IWallet): void {}

    // tslint:disable-next-line:no-empty
    public emitEvents(transaction: Transaction, emitter: EventEmitter.EventEmitter): void {}

    public canEnterTransactionPool(data: ITransactionData, guard: TransactionPool.IGuard): boolean {
        return true;
    }
}
