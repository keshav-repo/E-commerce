import { QueryResult } from "pg";

export interface db {
    connect(): Promise<void>;
    execute(query: string, values: any[]): Promise<QueryResult>;
}