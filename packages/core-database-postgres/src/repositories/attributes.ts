import { Attribute } from "../models";
import { queries } from "../queries";
import { Repository } from "./repository";

const { blocks: sql } = queries;

export class AttributesRepository extends Repository {
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
        return new Attribute(this.pgp);
    }

    /**
     * Create or update a record matching the attributes, and fill it with values.
     * @param  {Object} attribute
     * @return {Promise}
     */
    public async updateOrCreate(attribute) {
        const query = `${this.__insertQueryWithColumnSet(attribute, this.model.getColumnSetForUpdate())} 
        ON CONFLICT(id) DO UPDATE SET ${this.pgp.helpers.sets(attribute, this.model.getColumnSetForUpdate())}`;

        return this.db.none(query);
    }

    /**
     * Get Attributes With Validation Details
     * @param  {Object} parameters
     * @return {Promise}
     */
    public async getAttributesWithValidationDetails(parameters) {
        const query =
            "SELECT a.id, a.type, at.data_type, avra.action, avra.timestamp from attributes a " +
            " JOIN attribute_types at ON at.name = a.type " +
            " JOIN attribute_validation_requests avr ON avr.attribute_id = a.id " +
            " JOIN attribute_validation_request_actions avra on avra.attribute_validation_request_id = avr.id " +
            " WHERE avra.timestamp > " +
            parameters.since + // checks that the notarization took place after the "since" timestamp
            " AND (a.expire_timestamp > " +
            parameters.now +
            " OR a.expire_timestamp IS NULL) " + // checks that the attribute is not expired
            " AND avra.action = ANY(ARRAY[" +
            parameters.action +
            "]) AND avr.status = ANY(ARRAY[" +
            parameters.status +
            "]) " + // checks the action and status
            ' AND avra.timestamp > a.timestamp AND "owner" = \'' +
            parameters.owner +
            "'" +
            " ORDER BY a.id, avra.timestamp";

        return this.db.manyOrNone(query);
    }
}
