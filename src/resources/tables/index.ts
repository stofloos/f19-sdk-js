import Base from "../base";
import { BaseResponse, Block } from "../../types";

export declare type Table = Block;

export declare interface TablesResponse extends BaseResponse {
    payload: Array<Table>;
}

export declare interface TableResponse extends BaseResponse {
    payload: Table | null;
}

const resource = "table";

/**
 * Tables Resource
 * @class Tables
 * @extends Base
 */
export default class Tables extends Base {
    /**
     * Get all tables for a project
     * @param {string} projectId - The project id
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<TablesResponse>}
     * @throws Error
     */
    async getAll(
        projectId: string,
        options?: RequestInit
    ): Promise<TablesResponse> {
        if (!projectId) {
            throw new Error("No project id provided");
        }

        const response = await this.get(
            `/${resource}/project/${projectId}`,
            options || {}
        );
        return await response.json();
    }

    /**
     * Get a table by id
     * @param tableId
     * @param {RequestInit} options
     * @returns {Promise<TableResponse>}
     * @throws Error
     */
    async getById(
        tableId: string,
        options?: RequestInit
    ): Promise<TableResponse> {
        if (!tableId) {
            throw new Error("No table id provided");
        }

        const response = await this.get(
            `/${resource}/id/${tableId}`,
            options || {}
        );
        return await response.json();
    }
}
