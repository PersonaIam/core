import { Database } from "@arkecosystem/core-interfaces";
import { AttributeValidation } from "../models";
import { queries } from "../queries";
import { QueriesValidation } from "../queries/attributeValidation/search";
import { Repository } from "./repository";

const { blocks: sql } = queries;

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
            tempQuery = QueriesValidation.getAttributeValidationsForAttributeAndStatusQuery
                .replace('${attributeId}', parameters.attributeId)
                .replace('${status}', '\'' + parameters.status + '\'')
                .replace('${timespan}', parameters.timespan);
        } else if (parameters.owner) {
            tempQuery = QueriesValidation.getAttributeValidationsForAttributeAndStatusQuery
                .replace('${owner}', '\'' + parameters.owner + '\'')
                .replace('${status}', '\'' + parameters.status + '\'')
                .replace('${timespan}', parameters.timespan);
        } else {
            return {};
        }
        return this.db.any(tempQuery, {});
    }

    /**
     * add entry in attribute_validation_request_actions.
     * @param  {Object} parameters
     * @return {Promise}
     */

    public async addAttributeValidationRequestAction(parameters) {

        const query = `INSERT INTO attribute_validation_request_actions (attribute_validation_request_id,timestamp,action) VALUES (` +
            parameters.id + ',' + parameters.timestamp + ', \'' + parameters.action + '\')';

        return this.db.none(query);
    }

    /**
     * getAttributeValidationScore.
     * @param  {Object} filter
     * @return {Promise}
     */

    public async getAttributeValidationRequests(filter) {
        let query;
        if (filter.attributeId && !filter.validator) {
            query = QueriesValidation.getAttributeValidationRequestsForAttribute
                .replace('${attributeId}', filter.attributeId)
        } else {
            if (filter.attributeId && filter.validator) {
                query = QueriesValidation.getAttributeValidationRequestsForAttributeAndValidator
                    .replace('${attributeId}', filter.attributeId)
                    .replace('${validator}', '\'' + filter.validator + '\'')
            } else {
                if (!filter.validator && filter.owner) {
                    query = QueriesValidation.getAttributeValidationRequestsForOwner
                        .replace('${owner}', '\'' + filter.owner + '\'')
                }
                if (filter.validator && !filter.owner) {
                    query = QueriesValidation.getAttributeValidationRequestsForValidator
                        .replace('${validator}', '\'' + filter.validator + '\'')
                }
                if (filter.validator && filter.owner) {
                    query = QueriesValidation.getAttributeValidationRequestsForOwnerAndValidator
                        .replace('${validator}', '\'' + filter.validator + '\'')
                        .replace('${owner}', '\'' + filter.owner + '\'')
                }
            }
        }
        return this.db.any(query, {});
    }


}
