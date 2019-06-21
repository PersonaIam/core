import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
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
        const { data } = this;

        data.asset = { attribute: [] };
        data.asset.attribute[0] = {};

        data.asset.attribute[0].id = buf.readInt32();
        const ownerLength = buf.readUint8();
        data.asset.attribute[0].owner = buf.readBytes(ownerLength).toString("hex");

        const typeLength = buf.readUint8();
        data.asset.attribute[0].type = buf.readBytes(typeLength).toString("hex");

        const valueLength = buf.readUint8();
        data.asset.attribute[0].value = buf.readBytes(valueLength).toString("hex");

        data.asset.attribute[0].expire_timestamp = buf.readInt32();
        data.fee = 1;
        data.amount = 0;
    }
}
