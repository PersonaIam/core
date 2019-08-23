import ByteBuffer from "bytebuffer";
import { Validations } from "../../crypto";
import { TransactionTypes } from "../../enums";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class UpdateAttributeTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.UpdateAttribute;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.updateAttribute;
    }

    public serialize(): ByteBuffer {
        const { data } = this;
        const buffer = new ByteBuffer();

        buffer.writeUint32(data.asset.attribute[0].id);
        const owner = Buffer.from(data.asset.attribute[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        const type = Buffer.from(data.asset.attribute[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        const value = Buffer.from(data.asset.attribute[0].value, "utf8");
        buffer.writeByte(value.length);
        buffer.append(value, "hex");
        buffer.writeUint32(data.asset.attribute[0].expire_timestamp);
        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        let offset = buf.offset;
        const { data } = this;
        data.asset = { attribute: [] };
        data.asset.attribute[0] = {};
        const ownerLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.attribute[0].owner = buf.readString(ownerLength, offset).string;
        offset = offset + ownerLength;
        const typeLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.attribute[0].type = buf.readString(typeLength, offset).string;
        offset += typeLength;
        const valueLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.attribute[0].value = buf.readString(valueLength, offset).string;
        offset += valueLength;
        data.fee = "1";
        data.amount = "0";
        data.recipientId = Validations.getAddress(data.senderPublicKey, data.network);
        buf.offset = offset;
    }
}
