export interface IRepositoryDriver {
    query(queryString: string, parameters?: any): Promise<any>;
}