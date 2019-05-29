import { bignumify } from "@arkecosystem/core-utils";
import { Model } from "./model";

export class Service extends Model {
    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "services";
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSet() {
        return this.createColumnSet([
            {
                name: "name",
            },
            {
                name: "provider",
            },
            {
                name: "description",
            },
            {
                name: "timestamp",
            },
            {
                name: "validations_required",
            },
            {
                name: "attribute_types",
            },
            {
                name: "status",
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
                name: "status",
            },
        ]);
    }
}
