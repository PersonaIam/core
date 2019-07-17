import { Enums, Transactions } from "@arkecosystem/crypto";

import { DelegateRegistrationTransactionHandler } from "./delegate-registration";
import { DelegateResignationTransactionHandler } from "./delegate-resignation";
import { IpfsTransactionHandler } from "./ipfs";
import { MultiPaymentTransactionHandler } from "./multi-payment";
import { MultiSignatureTransactionHandler } from "./multi-signature";
import { SecondSignatureTransactionHandler } from "./second-signature";
import { TimelockTransferTransactionHandler } from "./timelock-transfer";
import { TransferTransactionHandler } from "./transfer";
import { VoteTransactionHandler } from "./vote";

import { ActivateServiceTransactionHandler } from "./activate-service";
import { CreateAttributeTransactionHandler } from "./create-attribute";
import { CreateServiceTransactionHandler } from "./create-service";
import { InactivateServiceTransactionHandler } from "./inactivate-service";

import { RequestAttributeValidationTransactionHandler } from "./attribute-validation-request";
import { RequestAttributeValidationApproveTransactionHandler } from "./attribute-validation-request-approve";
import { RequestAttributeValidationCancelTransactionHandler } from "./attribute-validation-request-cancel";
import { RequestAttributeValidationDeclineTransactionHandler } from "./attribute-validation-request-decline";
import { RequestAttributeValidationNotarizeTransactionHandler } from "./attribute-validation-request-notarize";
import { RequestAttributeValidationRejectTransactionHandler } from "./attribute-validation-request-reject";

import { RequestIdentityUseApproveTransactionHandler } from "./identity-use-approve";
import { RequestIdentityUseCancelTransactionHandler } from "./identity-use-cancel";
import { RequestIdentityUseDeclineTransactionHandler } from "./identity-use-decline";
import { RequestIdentityUseEndTransactionHandler } from "./identity-use-end";
import { RequestIdentityUseTransactionHandler } from "./identity-use-request";
import { UpdateAttributeTransactionHandler } from "./update-attribute";

import { InvalidTransactionTypeError, TransactionHandlerAlreadyRegisteredError } from "../errors";
import { TransactionHandler } from "./transaction";

export type TransactionHandlerConstructor = new () => TransactionHandler;

export class TransactionHandlerRegistry {
    private readonly coreTransactionHandlers: Map<Enums.TransactionTypes, TransactionHandler> = new Map<
        Enums.TransactionTypes,
        TransactionHandler
    >();
    private readonly customTransactionHandlers: Map<number, TransactionHandler> = new Map<number, TransactionHandler>();

    constructor() {
        this.registerCoreTransactionHandler(TransferTransactionHandler);
        this.registerCoreTransactionHandler(SecondSignatureTransactionHandler);
        this.registerCoreTransactionHandler(DelegateRegistrationTransactionHandler);
        this.registerCoreTransactionHandler(VoteTransactionHandler);
        this.registerCoreTransactionHandler(MultiSignatureTransactionHandler);
        this.registerCoreTransactionHandler(IpfsTransactionHandler);
        this.registerCoreTransactionHandler(TimelockTransferTransactionHandler);
        this.registerCoreTransactionHandler(MultiPaymentTransactionHandler);
        this.registerCoreTransactionHandler(DelegateResignationTransactionHandler);

        this.registerCoreTransactionHandler(ActivateServiceTransactionHandler);
        this.registerCoreTransactionHandler(InactivateServiceTransactionHandler);
        this.registerCoreTransactionHandler(CreateAttributeTransactionHandler);
        this.registerCoreTransactionHandler(CreateServiceTransactionHandler);
        this.registerCoreTransactionHandler(RequestAttributeValidationApproveTransactionHandler);
        this.registerCoreTransactionHandler(RequestAttributeValidationTransactionHandler);
        this.registerCoreTransactionHandler(RequestAttributeValidationCancelTransactionHandler);
        this.registerCoreTransactionHandler(RequestAttributeValidationDeclineTransactionHandler);
        this.registerCoreTransactionHandler(RequestAttributeValidationRejectTransactionHandler);
        this.registerCoreTransactionHandler(RequestAttributeValidationNotarizeTransactionHandler);
        this.registerCoreTransactionHandler(RequestIdentityUseApproveTransactionHandler);
        this.registerCoreTransactionHandler(RequestIdentityUseCancelTransactionHandler);
        this.registerCoreTransactionHandler(RequestIdentityUseDeclineTransactionHandler);
        this.registerCoreTransactionHandler(RequestIdentityUseEndTransactionHandler);
        this.registerCoreTransactionHandler(RequestIdentityUseTransactionHandler);
        this.registerCoreTransactionHandler(UpdateAttributeTransactionHandler);
    }

    public get(type: Enums.TransactionTypes | number): TransactionHandler {
        if (this.coreTransactionHandlers.has(type)) {
            return this.coreTransactionHandlers.get(type);
        }

        if (this.customTransactionHandlers.has(type)) {
            return this.customTransactionHandlers.get(type);
        }

        throw new InvalidTransactionTypeError(type);
    }

    public all(): TransactionHandler[] {
        return [...this.coreTransactionHandlers.values(), ...this.customTransactionHandlers.values()];
    }

    public registerCustomTransactionHandler(constructor: TransactionHandlerConstructor): void {
        const service: TransactionHandler = new constructor();
        const transactionConstructor = service.getConstructor();
        const { type } = transactionConstructor;

        if (this.customTransactionHandlers.has(type)) {
            throw new TransactionHandlerAlreadyRegisteredError(type);
        }

        Transactions.TransactionRegistry.registerCustomType(transactionConstructor);

        this.customTransactionHandlers.set(type, service);
    }

    public deregisterCustomTransactionHandler(constructor: TransactionHandlerConstructor): void {
        const service: TransactionHandler = new constructor();
        const transactionConstructor = service.getConstructor();
        const { type } = transactionConstructor;

        if (this.customTransactionHandlers.has(type)) {
            Transactions.TransactionRegistry.deregisterCustomType(type);
            this.customTransactionHandlers.delete(type);
        }
    }

    private registerCoreTransactionHandler(constructor: TransactionHandlerConstructor) {
        const service: TransactionHandler = new constructor();
        const transactionConstructor = service.getConstructor();
        const { type } = transactionConstructor;

        if (this.coreTransactionHandlers.has(type)) {
            throw new TransactionHandlerAlreadyRegisteredError(type);
        }

        this.coreTransactionHandlers.set(type, service);
    }
}

export const transactionHandlerRegistry = new TransactionHandlerRegistry();
