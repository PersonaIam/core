import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class CancelAttributeValidationRequestTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.CancelAttributeValidationRequest;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.cancelAttributeValidationRequest;
    }

    public serialize(): ByteBuffer {
        const { data } = this;
        const buffer = new ByteBuffer();

        const owner = Buffer.from(data.asset.validation[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        const validator = Buffer.from(data.asset.validation[0].validator, "utf8");
        buffer.writeByte(validator.length);
        buffer.append(validator, "hex");
        const type = Buffer.from(data.asset.validation[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        if (data.asset.validation[0].attributeId) {
            buffer.writeUint32(data.asset.validation[0].attributeId);
        } else {
            buffer.writeUint32(0);
        }

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        const { data } = this;

        data.asset = { validation: [] };
        data.asset.validation[0] = {};
        const ownerLength = buf.readUint8();
        data.asset.validation[0].owner = buf.readBytes(ownerLength).toString("hex");

        const validatorLength = buf.readUint8();
        data.asset.validation[0].validator = buf.readBytes(validatorLength).toString("hex");

        const typeLength = buf.readUint8();
        data.asset.validation[0].type = buf.readBytes(typeLength).toString("hex");
        const attributeId = buf.readInt32();
        if (attributeId !== 0) {
            data.asset.validation[0].attributeId = attributeId;
        }
        data.fee = 1;
        data.amount = 0;
    }
}
