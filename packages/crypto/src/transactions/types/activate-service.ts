import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../enums";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class ActivateServiceTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.ActivateService;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.activateService;
    }

    public serialize(): ByteBuffer {
        const { data } = this;
        const buffer = new ByteBuffer();

        const name = Buffer.from(data.asset.service.name, "utf8");
        buffer.writeByte(name.length);
        buffer.append(name, "hex");
        const provider = Buffer.from(data.asset.service.provider, "utf8");
        buffer.writeByte(provider.length);
        buffer.append(provider, "hex");

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        let offset = buf.offset;
        const { data } = this;
        data.asset = { service: {} };
        data.asset.service = {};
        const nameLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.service.name = buf.readString(nameLength, offset).string;
        offset = offset + nameLength;
        const providerLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.service.provider = buf.readString(providerLength, offset).string;
        offset = offset + providerLength;
        data.fee = "1";
        data.amount = "0";
        buf.offset = offset;
    }
}
