import { Address, PublicKey } from "../identities";

class Crypto {
    /**
     * Get address from public key.
     */
    public getAddress(publicKey: string, networkVersion?: number): string {
        return Address.fromPublicKey(publicKey, networkVersion);
    }

    /**
     * Validate address.
     */
    public validateAddress(address: string, networkVersion?: number): boolean {
        return Address.validate(address, networkVersion);
    }

    /**
     * Validate public key.
     */
    public validatePublicKey(address: string, networkVersion?: number): boolean {
        return PublicKey.validate(address, networkVersion);
    }
}

export const Validations = new Crypto();
