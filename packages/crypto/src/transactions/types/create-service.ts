import BigNumber from "bignumber.js";
import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../enums";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class CreateServiceTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.CreateService;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.createService;
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
        const description = Buffer.from(data.asset.service.description, "utf8");
        buffer.writeByte(description.length);
        buffer.append(description, "hex");
        const attributeTypes = Buffer.from(data.asset.service.attribute_types, "utf8");
        buffer.writeByte(attributeTypes.length);
        buffer.append(attributeTypes, "hex");

        buffer.writeUint32(data.asset.service.validations_required);

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

        const descriptionLength = buf.readUint8();
        data.asset.service.description = buf.readBytes(descriptionLength).toString("hex");

        const attributeTypesLength = buf.readUint8();
        data.asset.service.attribute_types = buf.readBytes(attributeTypesLength).toString("hex");

        data.asset.service.validations_required = buf.readInt32();

        data.fee = new BigNumber(1);
        data.amount = new BigNumber(0);
    }
}
