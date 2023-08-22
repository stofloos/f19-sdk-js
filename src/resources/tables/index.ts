import Base from "../base";
import { TablesResponse, TableResponse } from "./types";

/**
 * Tables Resource
 * @class Tables
 * @extends Base
 */
export default class Tables extends Base {
    /**
     * Get all tables for a project
     * @param projectId
     * @returns {Promise<TablesResponse>}
     * @throws Error
     */
    async getAll(projectId: string): Promise<TablesResponse> {
        if (!projectId) {
            throw new Error("No project id provided");
        }

        return this.request(
            `/cms/api/public/v1/table/project/
        ${projectId}`
        ).then(response => response.json());
    }

    /**
     * Get a table by id
     * @param tableId
     * @returns {Promise<TableResponse>}
     * @throws Error
     */
    async getById(tableId: string): Promise<TableResponse> {
        if (!tableId) {
            throw new Error("No table id provided");
        }

        return this.request(`/cms/api/public/v1/table/id/${tableId}`).then(
            response => response.json()
        );
    }
}
