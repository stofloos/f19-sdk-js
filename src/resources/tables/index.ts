import Base from "../base";
import { TablesResponse, TableResponse } from "./types";
const resource = "table";
/**
 * Tables Resource
 * @class Tables
 * @extends Base
 */
export default class Tables extends Base {
    /**
     * Get all tables for a project
     * @param projectId
     * @param preview
     * @returns {Promise<TablesResponse>}
     * @throws Error
     */
    async getAll(projectId: string, preview: boolean = false): Promise<TablesResponse> {
        if (!projectId) {
            throw new Error("No project id provided");
        }

        return this.get(
            `/${resource}/project/
        ${projectId}`,
            preview
        ).then(response => response.json());
    }

    /**
     * Get a table by id
     * @param tableId
     * @param preview
     * @returns {Promise<TableResponse>}
     * @throws Error
     */
    async getById(tableId: string, preview: boolean = false): Promise<TableResponse> {
        if (!tableId) {
            throw new Error("No table id provided");
        }

        return this.get(`/${resource}/id/${tableId}`, preview).then(response =>
            response.json()
        );
    }
}
