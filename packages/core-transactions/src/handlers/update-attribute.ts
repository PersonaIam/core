import { Database, EventEmitter, TransactionPool } from "@arkecosystem/core-interfaces";
import {
    ITransactionData,
    Transaction,
    TransactionConstructor,
    UpdateAttributeTransaction,
} from "@arkecosystem/crypto";

import { TransactionHandler } from "./transaction";

export class UpdateAttributeTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return UpdateAttributeTransaction;
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
        const attribute = transaction.data.asset.attribute[0];
        attribute.timestamp = transaction.data.timestamp;
        await connection.attributesRepository.updateOrCreate(attribute);
    };

    // tslint:disable-next-line:no-empty
    public revert(transaction: Transaction, wallet: Database.IWallet): void {}

    // tslint:disable-next-line:no-empty
    public emitEvents(transaction: Transaction, emitter: EventEmitter.EventEmitter): void {}

    public canEnterTransactionPool(data: ITransactionData, guard: TransactionPool.IGuard): boolean {
        return true;
    }
}
