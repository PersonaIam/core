import { IRepository } from "./repository";

export interface IServicesRepository extends IRepository {
    /**
     * Find a service by its ID.
     */
    findById(id: string): Promise<any>;

    /**
     * Count the number of records in the database.
     */
    count(): Promise<number>;

    /**
     * Get all of the common services from the database.
     */
    common(ids: string[]): Promise<any[]>;

    /**
     * Get all of the services within the given height range and order them by height.
     */
    heightRange(start: number, end: number): Promise<any[]>;

    /**
     * Get the last created service from the database.
     */
    latest(): Promise<any>;

    /**
     * Get the most recently created service ids from the database.
     * @return {Promise}
     */
    recent(count: number): Promise<any[]>;

    /**
     * Get statistics about all services from the database.
     */
    statistics(): Promise<{
        count: number;
    }>;

    /**
     * Get top count services
     */
    top(count: number): Promise<any[]>;

    /**
     * Delete the service from the database.
     */
    delete(id: string): Promise<void>;

    updateOrCreate(service: any): Promise<void>;
    updateServiceStatus(service: any): Promise<void>;
}
