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
        const descriptionLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.service.description = buf.readString(descriptionLength, offset).string;
        offset = offset + descriptionLength;
        const attributeTypesLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.service.attribute_types = buf.readString(attributeTypesLength, offset).string;
        offset = offset + attributeTypesLength;
        data.asset.service.validations_required = buf.readInt32(offset);
        offset += 4;
        data.fee = "1";
        data.amount = "0";
        buf.offset = offset;
    }
}
