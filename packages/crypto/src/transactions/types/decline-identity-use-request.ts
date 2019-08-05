import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class DeclineIdentityUseRequestTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.DeclineIdentityUseRequest;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.declineIdentityUseRequest;
    }

    public serialize(): ByteBuffer {
        const { data } = this;
        const buffer = new ByteBuffer();

        const owner = Buffer.from(data.asset.identityuse[0].owner, "utf8");
        buffer.writeByte(owner.length);
        buffer.append(owner, "hex");
        const serviceProvider = Buffer.from(data.asset.identityuse[0].serviceProvider, "utf8");
        buffer.writeByte(serviceProvider.length);
        buffer.append(serviceProvider, "hex");
        const serviceName = Buffer.from(data.asset.identityuse[0].serviceName, "utf8");
        buffer.writeByte(serviceName.length);
        buffer.append(serviceName, "hex");

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        let offset = buf.offset;
        const { data } = this;
        data.asset = { identityuse: [] };
        data.asset.identityuse[0] = {};
        const ownerLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.identityuse[0].owner = buf.readString(ownerLength, offset).string;
        offset = offset + ownerLength;
        const serviceProviderLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.identityuse[0].serviceProvider = buf.readString(serviceProviderLength, offset).string;
        offset = offset + serviceProviderLength;
        const serviceNameLength = buf.readUint8(offset);
        offset++;
        // @ts-ignore
        data.asset.identityuse[0].serviceName = buf.readString(serviceNameLength, offset).string;
        offset = offset + serviceNameLength;
        data.fee = "1";
        data.amount = "0";
        buf.offset = offset;
    }
}
