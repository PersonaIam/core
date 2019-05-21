import { Database } from "@arkecosystem/core-interfaces";
import { AttributeValidation } from "../models";
import { queries } from "../queries";
import { Repository } from "./repository";

const { blocks: sql } = queries;

let getAttributeValidationsForAttributeAndStatusQuery =
    'SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp ' +
    'FROM attribute_validation_requests avr ' +
    'JOIN attributes a ON a.id = avr.attribute_id ' +
    'LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) ' +
    'WHERE "attribute_id" = ${attribute_id} AND "status" = ${status} AND avr.timestamp > a.timestamp AND avr.timestamp > ${timespan}';

let getAttributeValidationsForOwnerAndStatus =
    'SELECT a.owner,a.type,avr.id,avr.attribute_id,avr.status,avr.validator,avr.validation_type,avr.reason,avr.timestamp as timestamp,avra.timestamp as last_update_timestamp ' +
    'FROM attribute_validation_requests avr ' +
    'JOIN attributes a ON a.id = avr.attribute_id ' +
    'LEFT OUTER JOIN attribute_validation_request_actions avra ON avr.id = avra.attribute_validation_request_id AND avra.timestamp = (SELECT MAX(timestamp) from attribute_validation_request_actions avra1 WHERE avra1.attribute_validation_request_id = avr.id) ' +
    'WHERE "owner" = ${owner} AND "status" = ${status} AND avr.timestamp > a.timestamp AND avr.timestamp > ${timespan}';

export class AttributeValidationsRepository extends Repository {
    /**
     * Find a block by its ID.
     * @param  {Number} id
     * @return {Promise}
     */
    public async findById(id) {
        return this.db.oneOrNone(sql.findById, { id });
    }

    /**
     * Count the number of records in the database.
     * @return {Promise}
     */
    public async count() {
        const { count } = await this.db.one(sql.count);
        return count ;
    }

    /**
     * Get all of the common blocks from the database.
     * @param  {Array} ids
     * @return {Promise}
     */
    public async common(ids) {
        return this.db.manyOrNone(sql.common, { ids });
    }

    /**
     * Get all of the blocks within the given height range.
     * @param  {Number} start
     * @param  {Number} end
     * @return {Promise}
     */
    public async headers(start, end) {
        return this.db.many(sql.headers, { start, end });
    }

    /**
     * Get all of the blocks within the given height range and order them by height.
     * @param  {Number} start
     * @param  {Number} end
     * @return {Promise}
     */
    public async heightRange(start, end) {
        return this.db.manyOrNone(sql.heightRange, { start, end });
    }

    /**
     * Get the last created block from the database.
     * @return {Promise}
     */
    public async latest() {
        return this.db.oneOrNone(sql.latest);
    }

    /**
     * Get the 10 most recently created blocks from the database.
     * @return {Promise}
     */
    public async recent() {
        return this.db.many(sql.recent);
    }

    /**
     * Get statistics about all blocks from the database.
     * @return {Promise}
     */
    public async statistics() {
        return this.db.one(sql.statistics);
    }

    /**
     * Get top count blocks
     * @return {Promise}
     */
    public async top(count) {
        return this.db.many(sql.top, { top: count });
    }

    /**
     * Delete the block from the database.
     * @param  {Number} id
     * @return {Promise}
     */
    public async delete(id) {
        return this.db.none(sql.delete, { id });
    }

    /**
     * Get the model related to this repository.
     * @return {Block}
     */
    public getModel() {
        return new AttributeValidation(this.pgp);
    }

    /**
     * Create or update a record matching the attributes, and fill it with values.
     * @param  {Object} attributeValidation
     * @return {Promise}
     */
    public async updateOrCreate(attributeValidation) {
        const query = `${this.__insertQueryWithColumnSet(attributeValidation, this.model.getColumnSetForUpdate() )} 
        ON CONFLICT(id) DO UPDATE SET ${this.pgp.helpers.sets(
            attributeValidation,
            this.model.getColumnSetForUpdate(),
        )}`;

        return this.db.none(query);
    }

    /**
     * getAttributeValidationScore.
     * @param  {Object} parameters
     * @return {Promise}
     */

    public async getAttributeValidationScore(parameters) {
        let tempQuery = "";
        if (parameters.attributeId) {
            tempQuery = getAttributeValidationsForAttributeAndStatusQuery
                .replace('${attribute_id}', parameters.attributeId)
                .replace('${status}', '\'' + parameters.status + '\'')
                .replace('${timespan}', parameters.timespan);
        } else if (parameters.owner) {
            tempQuery = getAttributeValidationsForAttributeAndStatusQuery
                .replace('${owner}', parameters.owner)
                .replace('${status}', '\'' + parameters.status + '\'')
                .replace('${timespan}', parameters.timespan);
        } else {
            return {};
        }
        return this.db.any(tempQuery, {});
    }

}
