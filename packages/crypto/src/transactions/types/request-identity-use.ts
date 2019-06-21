import ByteBuffer from "bytebuffer";
import { TransactionTypes } from "../../constants";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export class RequestIdentityUseTransaction extends Transaction {
    public static type: TransactionTypes = TransactionTypes.RequestIdentityUse;

    public static getSchema(): schemas.TransactionSchema {
        return schemas.requestIdentityUse;
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
        const { data } = this;

        data.asset = { identityuse: [] };
        data.asset.identityuse[0] = {};
        const ownerLength = buf.readUint8();
        data.asset.identityuse[0].owner = buf.readBytes(ownerLength).toString("hex");

        const serviceProviderLength = buf.readUint8();
        data.asset.identityuse[0].serviceProvider = buf.readBytes(serviceProviderLength).toString("hex");

        const serviceNameLength = buf.readUint8();
        data.asset.identityuse[0].serviceName = buf.readBytes(serviceNameLength).toString("hex");

        data.fee = 1;
        data.amount = 0;
    }
}
