import { bignumify } from "@arkecosystem/core-utils";
import { Model } from "./model";

export class Attribute extends Model {
    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "attributes";
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSet() {
        return this.createColumnSet([
            {
                name: "owner",
            },
            {
                name: "type",
            },
            {
                name: "value",
            },
            {
                name: "timestamp",
            },
            {
                name: "expire_timestamp",
                // prop: "expireTimestamp",
            },
        ]);
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSetForUpdate() {
        return this.createColumnSet([
            {
                name: "id",
            },
            {
                name: "owner",
            },
            {
                name: "type",
            },
            {
                name: "value",
            },
            {
                name: "timestamp",
            },
            {
                name: "expire_timestamp",
                // prop: "expireTimestamp",
            },
        ]);
    }
}
