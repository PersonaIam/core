import { TransactionTypes } from "../constants";
import { Bignum } from "../utils";

export interface IAttributeElement {
    owner?: string;
    type?: string;
    value?: string;
    id?: number;
    expire_timestamp?: number;
    timestamp?: number;
}

export interface IServiceElement {
    name?: string;
    provider?: string;
    description?: string;
    attribute_types?: string;
    validations_required?: number;
    status?: string;
    id?: number;
    timestamp?: number;
}

export interface IAttributeValidationElement {
    owner?: string;
    validator?: string;
    type?: string;
    attributeId?: number;
    timestamp?: number;
    expire_timestamp?: number;
    reason?: string;
    status?: string;
    validation_type?: string;
    id?: number;
    identityUsesIdsToReject?: object;
}

export interface IIdentityUseElement {
    owner?: string;
    serviceName?: string;
    serviceProvider?: string;
    attributes?: any;
    timestamp?: any;
    reason?: string;
    status?: string;
    id?: number;
}

export interface ITransactionAsset {
    attribute?: IAttributeElement[];
    service?: IServiceElement;
    validation?: IAttributeValidationElement[];
    identityuse?: IIdentityUseElement[];
    signature?: {
        publicKey: string;
    };
    delegate?: {
        username: string;
        publicKey?: string;
    };
    votes?: string[];
    multisignature?: IMultiSignatureAsset;
    ipfs?: {
        dag: string;
    };
    payments?: any;
    [custom: string]: any;
}

export interface IMultiSignatureAsset {
    min: number;
    keysgroup: string[];
    lifetime: number;
}

export interface ITransactionData {
    version?: number;
    network?: number;

    type: TransactionTypes;
    timestamp: number;
    senderPublicKey: string;

    fee: Bignum | number | string;
    amount: Bignum | number | string;

    expiration?: number;
    recipientId?: string;

    asset?: ITransactionAsset;
    vendorField?: string;
    vendorFieldHex?: string;

    id?: string;
    signature?: string;
    secondSignature?: string;
    signSignature?: string;
    signatures?: string[];

    blockId?: string;
    sequence?: number;

    timelock?: any;
    timelockType?: number;

    ipfsHash?: string;
    payments?: { [key: string]: any };
}

export interface ISchemaValidationResult<T = any> {
    value: T;
    error: any;
}
