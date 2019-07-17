import BigNumber from "bignumber.js";
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
        const { data } = this;

        data.asset = { service: {} };
        data.asset.service = {};

        const nameLength = buf.readUint8();
        data.asset.service.name = buf.readBytes(nameLength).toString("hex");

        const providerLength = buf.readUint8();
        data.asset.service.provider = buf.readBytes(providerLength).toString("hex");

        data.fee = new BigNumber(1);
        data.amount = new BigNumber(0);
    }
}
