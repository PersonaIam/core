import { bignumify } from "@arkecosystem/core-utils";
import { Model } from "./model";

export class AttributeValidation extends Model {
    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "attribute_validation_requests";
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSet() {
        return this.createColumnSet([
            {
                name: "attribute_id",
            },
            {
                name: "validator",
            },
            {
                name: "status",
            },
            {
                name: "reason",
            },
            {
                name: "timestamp",
            },
            {
                name: "validation_type",
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
                name: "attribute_id",
            },
            {
                name: "validator",
            },
            {
                name: "status",
            },
            {
                name: "reason",
            },
            {
                name: "timestamp",
            },
            {
                name: "validation_type",
            },
            {
                name: "expire_timestamp",
                // prop: "expireTimestamp",
            },
        ]);
    }
}
