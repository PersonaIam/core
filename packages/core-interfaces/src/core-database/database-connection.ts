import { Interfaces } from "@arkecosystem/crypto";
import { IBlocksRepository } from "./database-repository";
import { IRoundsRepository } from "./database-repository";
import { ITransactionsRepository } from "./database-repository";
import { IWalletsRepository } from "./database-repository";
import {
    IAttributesRepository,
    IAttributeValidationsRepository,
    IIdentityUsesRepository,
    IServicesRepository,
} from "./database-repository";

export interface IConnection {
    options: Record<string, any>;

    attributesRepository: IAttributesRepository;
    servicesRepository: IServicesRepository;
    attributeValidationsRepository: IAttributeValidationsRepository;
    identityUsesRepository: IIdentityUsesRepository;

    blocksRepository: IBlocksRepository;
    walletsRepository: IWalletsRepository;
    roundsRepository: IRoundsRepository;
    transactionsRepository: ITransactionsRepository;

    make(): Promise<IConnection>;

    connect(): Promise<void>;

    disconnect(): Promise<void>;

    buildWallets(): Promise<void>;

    saveBlock(block: Interfaces.IBlock): Promise<void>;

    saveBlocks(blocks: Interfaces.IBlock[]): Promise<void>;

    deleteBlock(block: Interfaces.IBlock): Promise<void>;

    enqueueDeleteBlock(block: Interfaces.IBlock): void;

    enqueueDeleteRound(height: number): void;

    commitQueuedQueries(): Promise<void>;

    // Identity Management methods start here

    saveAttribute(attribute: object): Promise<any>;
    // updateAttribute(attribute: object): Promise<any>;
    saveService(service: object): Promise<any>;
    updateService(service: object): Promise<any>;
    saveAttributeValidationRequest(validation: object): Promise<any>;
    updateAttributeValidationRequest(validation: object): Promise<any>;
    addAttributeValidationRequestAction(parameters: object): Promise<any>;
    getAttributeValidationScore(parameters: object): Promise<any>;
    getAttributeValidationRequests(parameters: object): Promise<any>;
    getAttributesWithValidationDetails(parameters: object): Promise<any>;
    saveIdentityUseRequest(identityuse: object): Promise<any>;
    updateIdentityUseRequest(identityuse: object): Promise<any>;
    addIdentityUseRequestAction(parameters: object): Promise<any>;
    getIdentityUseRequests(parameters: object): Promise<any>;
    getIdentityUseRequestWithValidationDetails(parameters: object): Promise<any>;
    updateIdentityUseWithReason(parameters: object): Promise<any>;
}
