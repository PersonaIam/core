import { IdentityUse } from "../models";
import { queries } from "../queries";
import { QueriesIdentityUse } from "../queries/identityUse/search";
import { Repository } from "./repository";

const { blocks: sql } = queries;

export class IdentityUsesRepository extends Repository {
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
        return count;
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
        return new IdentityUse(this.pgp);
    }

    /**
     * Create or update a record matching the attributes, and fill it with values.
     * @param  {Object} identityUse
     * @return {Promise}
     */
    public async updateOrCreate(identityUse) {
        const query = `${this.__insertQueryWithColumnSet(identityUse, this.model.getColumnSetForUpdate())} 
        ON CONFLICT(id) DO UPDATE SET ${this.pgp.helpers.sets(identityUse, this.model.getColumnSetForUpdate())}`;

        return this.db.none(query);
    }

    /**
     * add entry in identity_use_request_actions.
     * @param  {Object} parameters
     * @return {Promise}
     */

    public async addIdentityUseRequestAction(parameters) {
        const query =
            `INSERT INTO identity_use_request_actions (identity_use_request_id,timestamp,action) VALUES (` +
            parameters.id +
            "," +
            parameters.timestamp +
            ", '" +
            parameters.action +
            "')";

        return this.db.none(query);
    }

    /**
     * getAttributeValidationRequests.
     * @param  {Object} filter
     * @return {Promise}
     */

    public async getIdentityUseRequests(filter) {
        let query;
        if (filter.serviceId && filter.owner) {
            query = QueriesIdentityUse.getIdentityUseRequestsByServiceAndOwner
                .replace("${owner}", "'" + filter.owner + "'")
                .replace("${service_id}", filter.serviceId);
        } else {
            if (filter.serviceId) {
                query = QueriesIdentityUse.getIdentityUseRequestsByServiceId.replace("${service_id}", filter.serviceId);
            } else {
                if (filter.owner) {
                    query = QueriesIdentityUse.getIdentityUseRequestsByOwner.replace(
                        "${owner}",
                        "'" + filter.owner + "'",
                    );
                }
                if (filter.serviceName && filter.serviceProvider) {
                    query = QueriesIdentityUse.getIdentityUseRequestsByServiceNameAndProvider
                        .replace("${service_name}", "'" + filter.serviceName + "'")
                        .replace("${service_provider}", "'" + filter.serviceProvider + "'");
                }
                if (!filter.serviceName && filter.serviceProvider) {
                    query = QueriesIdentityUse.getIdentityUseRequestsByServiceProvider.replace(
                        "${service_provider}",
                        "'" + filter.serviceProvider + "'",
                    );
                }
            }
        }
        return this.db.any(query, {});
    }

    /**
     *
     * @param filter
     * @returns {Promise<void>}
     */
    public async getIdentityUseRequestWithValidationDetails(filter) {
        let query;
        query = QueriesIdentityUse.getAnsweredValidationRequestsForIdentityUseRequest
            .replace("${owner}", "'" + filter.owner + "'")
            .replace("${service_id}", filter.service_id);
        return this.db.any(query, {});
    }

    /**
     *
     * @param filter
     * @returns {Promise<void>}
     */
    public async updateIdentityUseWithReason(filter) {
        let query;
        query = QueriesIdentityUse.updateIdentityUseWithReason
            .replace("${status}", "'" + filter.status + "'")
            .replace("${reason}", "'" + filter.reason + "'")
            .replace("${ids}", filter.ids);
        return this.db.any(query, {});
    }
}
