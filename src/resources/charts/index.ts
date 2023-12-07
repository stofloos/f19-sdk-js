import Base from "../base";
import { BaseResponse, Block, ChannelResource } from "../../index";

export declare interface ChartTags {}

export type Chart = {
    multiChannelResources: Array<ChannelResource>;
    id: string;
    text: string;
    type: string;
    blocks: Array<Block>;
    multiChannelTags: Array<ChartTags>;
    events: Array<Event>;
};

export declare interface ChartResponse extends BaseResponse {
    payload: Chart | null;
}

export declare interface ChartsResponse extends BaseResponse {
    payload: Array<Chart>;
}

const resource = "chart";

/**
 * Charts resource
 * @class Charts
 */
export default class Charts extends Base {
    /**
     * Get all charts by project id
     * @param {string} projectId - The project ID.
     * @returns {Promise<ChartsResponse>} A Promise that resolves to a ChartsResponse.
     */
    async getAll(projectId: string): Promise<ChartsResponse> {
        const response = await this.get(`/${resource}/project/${projectId}`);
        return await response.json();
    }

    /**
     * Get chart by id
     * @param {string} chartId - The chart ID.
     * @returns {Promise<ChartResponse>} A Promise that resolves to a ChartResponse.
     */
    async getById(chartId: string): Promise<ChartResponse> {
        if (!chartId || chartId === "") {
            throw new Error("No chart id provided");
        }

        const response = await this.get(`/${resource}/id/${chartId}`);
        return await response.json();
    }
}
