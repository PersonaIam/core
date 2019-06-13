import bs58check from "bs58check";
import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../constants";
import { TransactionTypeError } from "../errors";
import { configManager } from "../managers";
import { Transaction } from "../models";
import { ITransactionData } from "../models";
import { Bignum } from "../utils";

// Reference: https://github.com/ArkEcosystem/AIPs/blob/master/AIPS/aip-11.md
class TransactionSerializer {
    public serialize(transaction: ITransactionData): Buffer {
        const buffer = new ByteBuffer(512, true);

        this.serializeCommon(transaction, buffer);
        this.serializeVendorField(transaction, buffer);
        this.serializeType(transaction, buffer);
        this.serializeSignatures(transaction, buffer);

        return Buffer.from(buffer.flip().toBuffer());
    }

    private serializeCommon(transaction: ITransactionData, buffer: ByteBuffer): void {
        buffer.writeByte(0xff); // fill, to disambiguate from v1
        buffer.writeByte(transaction.version || 0x01); // version
        buffer.writeByte(transaction.network || configManager.get("pubKeyHash")); // ark = 0x17, devnet = 0x30
        buffer.writeByte(transaction.type);
        buffer.writeUint32(transaction.timestamp);
        buffer.append(transaction.senderPublicKey, "hex");
        buffer.writeUint64(+new Bignum(transaction.fee).toFixed());
    }

    private serializeVendorField(transaction: ITransactionData, buffer: ByteBuffer): void {
        if (Transaction.canHaveVendorField(transaction.type)) {
            if (transaction.vendorField) {
                const vf = Buffer.from(transaction.vendorField, "utf8");
                buffer.writeByte(vf.length);
                buffer.append(vf);
            } else if (transaction.vendorFieldHex) {
                buffer.writeByte(transaction.vendorFieldHex.length / 2);
                buffer.append(transaction.vendorFieldHex, "hex");
            } else {
                buffer.writeByte(0x00);
            }
        } else {
            buffer.writeByte(0x00);
        }
    }

    private serializeType(transaction: ITransactionData, buffer: ByteBuffer): void {
        if (transaction.type === TransactionTypes.Transfer) {
            this.serializeTransfer(transaction, buffer);
        } else if (transaction.type === TransactionTypes.SecondSignature) {
            this.serializeSecondSignature(transaction, buffer);
        } else if (transaction.type === TransactionTypes.DelegateRegistration) {
            this.serializeDelegateRegistration(transaction, buffer);
        } else if (transaction.type === TransactionTypes.Vote) {
            this.serializeVote(transaction, buffer);
        } else if (transaction.type === TransactionTypes.MultiSignature) {
            this.serializeMultiSignature(transaction, buffer);
        } else if (transaction.type === TransactionTypes.Ipfs) {
            this.serializeIpfs(transaction, buffer);
        } else if (transaction.type === TransactionTypes.TimelockTransfer) {
            this.serializeTimelockTransfer(transaction, buffer);
        } else if (transaction.type === TransactionTypes.MultiPayment) {
            this.serializeMultiPayment(transaction, buffer);
        } else if (transaction.type === TransactionTypes.DelegateResignation) {
            this.serializeDelegateResignation(transaction, buffer);
        } else if (transaction.type === TransactionTypes.CreateAttribute) {
            this.serializeCreateAttribute(transaction, buffer);
        }  else if (transaction.type === TransactionTypes.UpdateAttribute) {
            this.serializeUpdateAttribute(transaction, buffer);
        } else if (transaction.type === TransactionTypes.RequestAttributeValidation) {
            this.serializeCreateAttributeValidationRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.ApproveAttributeValidationRequest) {
            this.serializeApproveAttributeValidationRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.DeclineAttributeValidationRequest) {
            this.serializeDeclineAttributeValidationRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.NotarizeAttributeValidationRequest) {
            this.serializeNotarizeAttributeValidationRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.RejectAttributeValidationRequest) {
            this.serializeRejectAttributeValidationRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.CancelAttributeValidationRequest) {
            this.serializeCancelAttributeValidationRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.CreateService) {
            this.serializeCreateService(transaction, buffer);
        } else if (transaction.type === TransactionTypes.ActivateService) {
            this.serializeActivateService(transaction, buffer);
        } else if (transaction.type === TransactionTypes.InactivateService) {
            this.serializeInactivateService(transaction, buffer);
        }  else if (transaction.type === TransactionTypes.RequestIdentityUse) {
            this.serializeCreateIdentityUseRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.ApproveIdentityUseRequest) {
            this.serializeApproveIdentityUseRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.DeclineIdentityUseRequest) {
            this.serializeDeclineIdentityUseRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.EndIdentityUseRequest) {
            this.serializeEndIdentityUseRequest(transaction, buffer);
        } else if (transaction.type === TransactionTypes.CancelIdentityUseRequest) {
            this.serializeCancelIdentityUseRequest(transaction, buffer);
        } else {
            throw new TransactionTypeError(transaction.type);
        }
    }

    private serializeTransfer(transaction: ITransactionData, buffer: ByteBuffer): void {
        buffer.writeUint64(+new Bignum(transaction.amount).toFixed());
        buffer.writeUint32(transaction.expiration || 0);
        buffer.append(bs58check.decode(transaction.recipientId));
    }

    private serializeSecondSignature(transaction: ITransactionData, buffer: ByteBuffer): void {
        buffer.append(transaction.asset.signature.publicKey, "hex");
    }

    private serializeDelegateRegistration(transaction: ITransactionData, buffer: ByteBuffer): void {
        const delegateBytes = Buffer.from(transaction.asset.delegate.username, "utf8");
        buffer.writeByte(delegateBytes.length);
        buffer.append(delegateBytes, "hex");
    }

    private serializeVote(transaction: ITransactionData, buffer: ByteBuffer): void {
        const voteBytes = transaction.asset.votes.map(vote => (vote[0] === "+" ? "01" : "00") + vote.slice(1)).join("");
        buffer.writeByte(transaction.asset.votes.length);
        buffer.append(voteBytes, "hex");
    }

    private serializeMultiSignature(transaction: ITransactionData, buffer: ByteBuffer): void {
        let joined = null;

        if (!transaction.version || transaction.version === 1) {
            joined = transaction.asset.multisignature.keysgroup.map(k => (k[0] === "+" ? k.slice(1) : k)).join("");
        } else {
            joined = transaction.asset.multisignature.keysgroup.join("");
        }

        const keysgroupBuffer = Buffer.from(joined, "hex");
        buffer.writeByte(transaction.asset.multisignature.min);
        buffer.writeByte(transaction.asset.multisignature.keysgroup.length);
        buffer.writeByte(transaction.asset.multisignature.lifetime);
        buffer.append(keysgroupBuffer, "hex");
    }

    private serializeIpfs(transaction: ITransactionData, buffer: ByteBuffer): void {
        buffer.writeByte(transaction.asset.ipfs.dag.length / 2);
        buffer.append(transaction.asset.ipfs.dag, "hex");
    }

    private serializeTimelockTransfer(transaction: ITransactionData, buffer: ByteBuffer): void {
        buffer.writeUint64(+new Bignum(transaction.amount).toFixed());
        buffer.writeByte(transaction.timelockType);
        buffer.writeUint64(transaction.timelock);
        buffer.append(bs58check.decode(transaction.recipientId));
    }

    private serializeMultiPayment(transaction: ITransactionData, buffer: ByteBuffer): void {
        buffer.writeUint32(transaction.asset.payments.length);
        transaction.asset.payments.forEach(p => {
            buffer.writeUint64(+new Bignum(p.amount).toFixed());
            buffer.append(bs58check.decode(p.recipientId));
        });
    }

    private serializeDelegateResignation(transaction: ITransactionData, buffer: ByteBuffer): void {
        return;
    }

    serializeCreateAttribute(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.attribute[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let type = Buffer.from(transaction.asset.attribute[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        let value = Buffer.from(transaction.asset.attribute[0].value, "utf8");
        buffer.writeByte(value.length);
        buffer.append(value, "hex");
    }

    serializeCreateService(transaction, buffer) {
        let name = Buffer.from(transaction.asset.service.name, "utf8");
        buffer.writeByte(name.length);
        buffer.append(name, "hex");
        let provider = Buffer.from(transaction.asset.service.provider, "utf8");
        buffer.writeByte(provider.length);
        buffer.append(provider, "hex");
        let description = Buffer.from(transaction.asset.service.description, "utf8");
        buffer.writeByte(description.length);
        buffer.append(description, "hex");
        let attributeTypes = Buffer.from(transaction.asset.service.attribute_types, "utf8");
        buffer.writeByte(attributeTypes.length);
        buffer.append(attributeTypes, "hex");

        buffer.writeUInt32(transaction.asset.service.validations_required);
    }

    serializeActivateService(transaction, buffer) {
        let name = Buffer.from(transaction.asset.service.name, "utf8");
        buffer.writeByte(name.length);
        buffer.append(name, "hex");
        let provider = Buffer.from(transaction.asset.service.provider, "utf8");
        buffer.writeByte(provider.length);
        buffer.append(provider, "hex");
    }

    serializeInactivateService(transaction, buffer) {
        let name = Buffer.from(transaction.asset.service.name, "utf8");
        buffer.writeByte(name.length);
        buffer.append(name, "hex");
        let provider = Buffer.from(transaction.asset.service.provider, "utf8");
        buffer.writeByte(provider.length);
        buffer.append(provider, "hex");
    }

    serializeUpdateAttribute(transaction, buffer) {
        buffer.writeUInt32(transaction.asset.attribute[0].id)
        let owner = Buffer.from(transaction.asset.attribute[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let type = Buffer.from(transaction.asset.attribute[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        let value = Buffer.from(transaction.asset.attribute[0].value, "utf8");
        buffer.writeByte(value.length);
        buffer.append(value, "hex");
        buffer.writeUInt32(transaction.asset.attribute[0].expire_timestamp)
    }

    serializeCreateAttributeValidationRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let validator = Buffer.from(transaction.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        let type = Buffer.from(transaction.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (transaction.asset.validation[0].attributeId) {
            buffer.writeUInt32(transaction.asset.validation[0].attributeId);
        } else {
            buffer.writeUInt32(0);
        }
    }

    serializeApproveAttributeValidationRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let validator = Buffer.from(transaction.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        let type = Buffer.from(transaction.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (transaction.asset.validation[0].attributeId) {
            buffer.writeUInt32(transaction.asset.validation[0].attributeId);
        } else {
            buffer.writeUInt32(0);
        }
    }

    serializeDeclineAttributeValidationRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let validator = Buffer.from(transaction.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        let type = Buffer.from(transaction.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (transaction.asset.validation[0].attributeId) {
            buffer.writeUInt32(transaction.asset.validation[0].attributeId);
        } else {
            buffer.writeUInt32(0);
        }
    }

    serializeNotarizeAttributeValidationRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let validator = Buffer.from(transaction.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        let type = Buffer.from(transaction.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (transaction.asset.validation[0].attributeId) {
            buffer.writeUInt32(transaction.asset.validation[0].attributeId);
        } else {
            buffer.writeUInt32(0);
        }
    }

    serializeCancelAttributeValidationRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let validator = Buffer.from(transaction.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        let type = Buffer.from(transaction.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (transaction.asset.validation[0].attributeId) {
            buffer.writeUInt32(transaction.asset.validation[0].attributeId);
        } else {
            buffer.writeUInt32(0);
        }
    }

    serializeRejectAttributeValidationRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let validator = Buffer.from(transaction.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        let type = Buffer.from(transaction.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (transaction.asset.validation[0].attributeId) {
            buffer.writeUInt32(transaction.asset.validation[0].attributeId);
        } else {
            buffer.writeUInt32(0);
        }
    }

    serializeCreateIdentityUseRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.identityuse[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let serviceProvider = Buffer.from(transaction.asset.identityuse[0].serviceProvider, "utf8");
        buffer.writeByte(serviceProvider.length);
        buffer.append(serviceProvider, "hex");
        let serviceName = Buffer.from(transaction.asset.identityuse[0].serviceName, "utf8");
        buffer.writeByte(serviceName.length);
        buffer.append(serviceName, "hex");
    }

    serializeApproveIdentityUseRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.identityuse[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let serviceProvider = Buffer.from(transaction.asset.identityuse[0].serviceProvider, "utf8");
        buffer.writeByte(serviceProvider.length);
        buffer.append(serviceProvider, "hex");
        let serviceName = Buffer.from(transaction.asset.identityuse[0].serviceName, "utf8");
        buffer.writeByte(serviceName.length);
        buffer.append(serviceName, "hex");

    }

    serializeDeclineIdentityUseRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.identityuse[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let serviceProvider = Buffer.from(transaction.asset.identityuse[0].serviceProvider, "utf8");
        buffer.writeByte(serviceProvider.length);
        buffer.append(serviceProvider, "hex");
        let serviceName = Buffer.from(transaction.asset.identityuse[0].serviceName, "utf8");
        buffer.writeByte(serviceName.length);
        buffer.append(serviceName, "hex");

    }

    serializeCancelIdentityUseRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.identityuse[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let serviceProvider = Buffer.from(transaction.asset.identityuse[0].serviceProvider, "utf8");
        buffer.writeByte(serviceProvider.length);
        buffer.append(serviceProvider, "hex");
        let serviceName = Buffer.from(transaction.asset.identityuse[0].serviceName, "utf8");
        buffer.writeByte(serviceName.length);
        buffer.append(serviceName, "hex");

    }

    serializeEndIdentityUseRequest(transaction, buffer) {
        let owner = Buffer.from(transaction.asset.identityuse[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        let serviceProvider = Buffer.from(transaction.asset.identityuse[0].serviceProvider, "utf8");
        buffer.writeByte(serviceProvider.length);
        buffer.append(serviceProvider, "hex");
        let serviceName = Buffer.from(transaction.asset.identityuse[0].serviceName, "utf8");
        buffer.writeByte(serviceName.length);
        buffer.append(serviceName, "hex");

    }

    private serializeSignatures(transaction: ITransactionData, buffer: ByteBuffer): void {
        if (transaction.signature) {
            buffer.append(transaction.signature, "hex");
        }

        if (transaction.secondSignature) {
            buffer.append(transaction.secondSignature, "hex");
        } else if (transaction.signSignature) {
            buffer.append(transaction.signSignature, "hex");
        }

        if (transaction.signatures) {
            buffer.append("ff", "hex"); // 0xff separator to signal start of multi-signature transactions
            buffer.append(transaction.signatures.join(""), "hex");
        }
    }
}

export const transactionSerializer = new TransactionSerializer();
