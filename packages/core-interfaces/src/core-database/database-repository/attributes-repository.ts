import { IRepository } from "./repository";

export interface IAttributesRepository extends IRepository {
    /**
     * Find an attribute by its ID.
     */
    findById(id: string): Promise<any>;

    /**
     * Count the number of attributes in the database.
     */
    count(): Promise<number>;

    /**
     * Get all of the common entries from the database.
     */
    common(ids: string[]): Promise<any[]>;

    /**
     * Get all of the entries within the given height range and order them by height.
     */
    heightRange(start: number, end: number): Promise<any[]>;

    /**
     * Get the last created attribute from the database.
     */
    latest(): Promise<any>;

    /**
     * Get the most recently created attribute ids from the database.
     * @return {Promise}
     */
    recent(count: number): Promise<any[]>;

    /**
     * Get statistics about all attribute from the database.
     */
    statistics(): Promise<{
        count: number;
    }>;

    /**
     * Get top count attributes
     */
    top(count: number): Promise<any[]>;

    /**
     * Delete the block from the database.
     */
    delete(id: string): Promise<void>;

    updateOrCreate(attribute: any): Promise<void>;

    getAttributesWithValidationDetails(parameters: any): Promise<void>;
}
