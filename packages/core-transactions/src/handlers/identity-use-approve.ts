import { Database, EventEmitter, TransactionPool } from "@arkecosystem/core-interfaces";
import {
    ApproveIdentityUseRequestTransaction,
    ITransactionData,
    Transaction,
    TransactionConstructor,
} from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class RequestIdentityUseApproveTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return ApproveIdentityUseRequestTransaction;
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
    public revert(transaction: Transaction, wallet: Database.IWallet): void {}

    // tslint:disable-next-line:no-empty
    public emitEvents(transaction: Transaction, emitter: EventEmitter.EventEmitter): void {}

    public canEnterTransactionPool(data: ITransactionData, guard: TransactionPool.IGuard): boolean {
        return true;
    }
}
