import { Database } from "@arkecosystem/core-interfaces";
import { Service } from "../models";
import { queries } from "../queries";
import { Repository } from "./repository";

const { blocks: sql } = queries;

export class ServicesRepository extends Repository {
    /**
     * Find a service by its ID.
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
     * Delete the service from the database.
     * @param  {Number} id
     * @return {Promise}
     */
    public async delete(id) {
        return this.db.none(sql.delete, { id });
    }

    /**
     * Get the model related to this repository.
     * @return {Service}
     */
    public getModel() {
        return new Service(this.pgp);
    }

    /**
     * Create or update a record matching the service, and fill it with values.
     * @param  {Object} service
     * @return {Promise}
     */
    public async updateOrCreate(service) {
        const query = `${this.__insertQueryWithColumnSet(service, this.model.getColumnSetForUpdate())} 
        ON CONFLICT(id) DO UPDATE SET ${this.pgp.helpers.sets(service, this.model.getColumnSetForUpdate())}`;

        return this.db.none(query);
    }

    public async updateServiceStatus(service) {
        const query = "UPDATE services set status ='" + service.status + "' where id=" + service.id;

        return this.db.none(query);
    }
}
