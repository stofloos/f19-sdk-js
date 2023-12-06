import Base from "../base";
import { BaseResponse, Block } from "../../index";

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
     * @param projectId
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
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
            options
        );
        const json = await response.json();
        return json;
    }

    /**
     * Get a table by id
     * @param tableId
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
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

        const response = await this.get(`/${resource}/id/${tableId}`, options);
        const json = await response.json();
        return json;
    }
}
