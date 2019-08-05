import { Database } from "@arkecosystem/core-interfaces";
import { TimelockTransferTransaction, Transaction, TransactionConstructor } from "@arkecosystem/crypto";
import { TransactionHandler } from "./transaction";

export class TimelockTransferTransactionHandler extends TransactionHandler {
    public getConstructor(): TransactionConstructor {
        return TimelockTransferTransaction;
    }

    public canBeApplied(
        transaction: Transaction,
        wallet: Database.IWallet,
        walletManager?: Database.IWalletManager,
    ): boolean {
        return super.canBeApplied(transaction, wallet, walletManager);
    }

    public apply(transaction: Transaction, wallet: Database.IWallet): void {
        return;
    }

    // tslint:disable-next-line:no-empty
    public applyToDB(transaction: Transaction, connection: Database.IConnection): void {}

    public revert(transaction: Transaction, wallet: Database.IWallet): void {
        return;
    }
}
