import { IRepository } from "./repository";

export interface IIdentityUsesRepository extends IRepository {

    /**
     * Find a request by its ID.
     */
    findById(id: string): Promise<any>;

    /**
     * Count the number of records in the database.
     */
    count(): Promise<number>;

    /**
     * Get all of the common entries from the database.
     */
    common(ids: string[]): Promise<any[]>

    /**
     * Get all of the entries within the given height range and order them by height.
     */
    heightRange(start: number, end: number): Promise<any[]>;

    /**
     * Get the last created entry from the database.
     */
    latest(): Promise<any>;

    /**
     * Get the most recently created entry from the database.
     * @return {Promise}
     */
    recent(count: number): Promise<any[]>;

    /**
     * Get statistics from the database.
     */
    statistics(): Promise<{
        count: number
    }>;

    /**
     * Get top count
     */
    top(count: number): Promise<any[]>;

    /**
     * Delete the entry from the database.
     */
    delete(id: string): Promise<void>;

    updateOrCreate(attribute: any): Promise<void>;

    addIdentityUseRequestAction(parameters : any) : Promise<void>;

    getIdentityUseRequests(parameters : any) : Promise<void>;

    getIdentityUseRequestWithValidationDetails(parameters : any) : Promise<void>;

    updateIdentityUseWithReason(parameters : any) : Promise<void>;

}
