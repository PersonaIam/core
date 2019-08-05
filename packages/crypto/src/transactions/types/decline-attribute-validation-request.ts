import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class DeclineAttributeValidationRequestTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.DeclineAttributeValidationRequest;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.declineAttributeValidationRequest;
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
        let offset = buf.offset;
        const { data } = this;

        data.asset = { validation: [] };
        data.asset.validation[0] = {};
        const ownerLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.validation[0].owner = buf.readString(ownerLength, offset).string;
        offset = offset + ownerLength;
        const validatorLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.validation[0].validator = buf.readString(validatorLength, offset).string;
        offset = offset + validatorLength;
        const typeLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.validation[0].type = buf.readString(typeLength, offset).string;
        offset = offset + typeLength;
        const attributeId = buf.readInt32(offset);
        offset += 4;
        if (attributeId !== 0) {
            data.asset.validation[0].attributeId = attributeId;
        }
        data.fee = "1";
        data.amount = "0";
        buf.offset = offset;
    }
}
