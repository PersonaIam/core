import { Database, EventEmitter, TransactionPool } from "@arkecosystem/core-interfaces";
import {
    DeclineIdentityUseRequestTransaction,
    ITransactionData,
    Transaction,
    TransactionConstructor,
} from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class RequestIdentityUseDeclineTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return DeclineIdentityUseRequestTransaction;
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
        const identityUse = transaction.data.asset.identityuse[0];
        identityUse.timestamp = transaction.data.timestamp;
        if (!identityUse.reason) {
            identityUse.reason = null;
        }
        identityUse.status = "DECLINED";
        await connection.updateIdentityUseRequest(identityUse);
        await connection.addIdentityUseRequestAction({
            id: identityUse.id,
            action: "DECLINE",
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
