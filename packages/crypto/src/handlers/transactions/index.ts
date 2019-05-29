import { TransactionTypes } from "../../constants";
import { ITransactionData, Wallet } from "../../models";
import { DelegateRegistrationHandler } from "./delegate-registration";
import { DelegateResignationHandler } from "./delegate-resignation";
import { Handler } from "./handler";
import { IpfsHandler } from "./ipfs";
import { MultiPaymentHandler } from "./multi-payment";
import { MultiSignatureHandler } from "./multi-signature";
import { SecondSignatureHandler } from "./second-signature";
import { TimelockTransferHandler } from "./timelock-transfer";
import { TransferHandler } from "./transfer";
import { CreateAttributeHandler } from "./create-attribute";
import { UpdateAttributeHandler } from "./update-attribute";
import { RequestAttributeValidationHandler } from "./attribute-validation-request";
import { RequestAttributeValidationApproveHandler } from "./attribute-validation-request-approve";
import { RequestAttributeValidationDeclineHandler } from "./attribute-validation-request-decline";
import { RequestAttributeValidationRejectHandler } from "./attribute-validation-request-reject";
import { RequestAttributeValidationNotarizeHandler } from "./attribute-validation-request-notarize";
import { RequestAttributeValidationCancelHandler } from "./attribute-validation-request-cancel";
import { CreateServiceHandler } from "./create-service";
import { ActivateServiceHandler } from "./activate-service";
import { InactivateServiceHandler } from "./inactivate-service";
import { VoteHandler } from "./vote";

class TransactionHandler {
    public handlers: { [x in TransactionTypes]: typeof Handler };

    constructor() {
        this.handlers = {
            [TransactionTypes.Transfer]: TransferHandler,
            [TransactionTypes.SecondSignature]: SecondSignatureHandler,
            [TransactionTypes.DelegateRegistration]: DelegateRegistrationHandler,
            [TransactionTypes.Vote]: VoteHandler,
            [TransactionTypes.MultiSignature]: MultiSignatureHandler,
            [TransactionTypes.Ipfs]: IpfsHandler,
            [TransactionTypes.TimelockTransfer]: TimelockTransferHandler,
            [TransactionTypes.MultiPayment]: MultiPaymentHandler,
            [TransactionTypes.DelegateResignation]: DelegateResignationHandler,
            [TransactionTypes.CreateAttribute]: CreateAttributeHandler,
            [TransactionTypes.UpdateAttribute]: UpdateAttributeHandler,
            [TransactionTypes.RequestAttributeValidation]: RequestAttributeValidationHandler,
            [TransactionTypes.ApproveAttributeValidationRequest]: RequestAttributeValidationApproveHandler,
            [TransactionTypes.DeclineAttributeValidationRequest]: RequestAttributeValidationDeclineHandler,
            [TransactionTypes.RejectAttributeValidationRequest]: RequestAttributeValidationRejectHandler,
            [TransactionTypes.NotarizeAttributeValidationRequest]: RequestAttributeValidationNotarizeHandler,
            [TransactionTypes.CancelAttributeValidationRequest]: RequestAttributeValidationCancelHandler,
            [TransactionTypes.CreateService]: CreateServiceHandler,
            [TransactionTypes.ActivateService]: ActivateServiceHandler,
            [TransactionTypes.InactivateService]: InactivateServiceHandler
        };
    }

    /**
     * Check if the transaction can be applied to the wallet.
     */
    public canApply(wallet: Wallet, transaction: ITransactionData, errors: string[]): boolean {
        return this.getHandler(transaction).canApply(wallet, transaction, errors);
    }

    /**
     * Associate this wallet as the sender of a transaction.
     */
    public applyTransactionToSender(wallet: Wallet, transaction: ITransactionData): void {
        this.getHandler(transaction).applyTransactionToSender(wallet, transaction);
    }

    /**
     * Add transaction balance to this wallet.
     */
    public applyTransactionToRecipient(wallet: Wallet, transaction: ITransactionData): void {
        this.getHandler(transaction).applyTransactionToRecipient(wallet, transaction);
    }

    /**
     * Remove this wallet as the sender of a transaction.
     */
    public revertTransactionForSender(wallet: Wallet, transaction: ITransactionData): void {
        this.getHandler(transaction).revertTransactionForSender(wallet, transaction);
    }

    /**
     * Remove transaction balance from this wallet.
     */
    public revertTransactionForRecipient(wallet: Wallet, transaction: ITransactionData): void {
        this.getHandler(transaction).revertTransactionForRecipient(wallet, transaction);
    }

    private getHandler(transaction: ITransactionData): Handler {
        return new (this.handlers[transaction.type] as any)();
    }
}

export const transactionHandler = new TransactionHandler();
