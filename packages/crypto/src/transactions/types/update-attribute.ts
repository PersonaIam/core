import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
import { crypto } from "../../crypto";
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

        const ownerBuffer = Buffer.from(data.asset.attribute[0].owner, "utf8");
        buffer.writeByte(ownerBuffer.length);
        buffer.append(ownerBuffer, "hex");
        const typeBuffer = Buffer.from(data.asset.attribute[0].type, "utf8");
        buffer.writeByte(typeBuffer.length);
        buffer.append(typeBuffer, "hex");
        const valueBuffer = Buffer.from(data.asset.attribute[0].value, "utf8");
        buffer.writeByte(valueBuffer.length);
        buffer.append(valueBuffer, "hex");

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
        data.recipientId = crypto.getAddress(data.senderPublicKey, data.network);
        buf.offset = offset;
    }
}
