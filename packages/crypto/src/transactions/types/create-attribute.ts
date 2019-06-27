import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
import { crypto } from "../../crypto";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class CreateAttributeTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.CreateAttribute;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.createAttribute;
    }

    public serialize(): ByteBuffer {
        const { data } = this;
        const buffer = new ByteBuffer();
        const owner = Buffer.from(data.asset.attribute[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        const type = Buffer.from(data.asset.attribute[0].type, "utf8");
        buffer.writeByte(type.length);
        buffer.append(type, "hex");
        const value = Buffer.from(data.asset.attribute[0].value, "utf8");
        buffer.writeByte(value.length);
        buffer.append(value, "hex");

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        const { data } = this;
        data.asset = { attribute: [] };
        data.asset.attribute[0] = {};
        const ownerLength = buf.readUint8();
        data.asset.attribute[0].owner = buf.readBytes(ownerLength).toString("hex");

        const typeLength = buf.readUint8();
        data.asset.attribute[0].type = buf.readBytes(typeLength).toString("hex");

        const valueLength = buf.readUint8();
        data.asset.attribute[0].value = buf.readBytes(valueLength).toString("hex");
        data.fee = 1;
        data.amount = 0;
        data.recipientId = crypto.getAddress(data.senderPublicKey, data.network);
    }
}
