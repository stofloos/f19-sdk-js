import Base from "../base";
import { ChartsResponse, ChartResponse } from "./types";

/**
 * Charts resource
 * @class Charts
 * @constructor Charts
 * @param {Config} config
 * @method getAll - Get all charts by project id
 * @method getById - Get chart by id
 */
export default class Charts extends Base {
    /**
     * Get all charts by project id
     * @param projectId
     * @returns {Promise<ChartsResponse>}
     */
    async getAll(projectId: string): Promise<ChartsResponse> {
        return this.request(`/cms/api/public/v1/chart/project/${projectId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    /**
     * Get chart by id
     * @param chartId
     * @returns {Promise<ChartResponse>}
     */
    async getById(chartId: string): Promise<ChartResponse> {
        if (!chartId || chartId === "") {
            throw new Error("No chart id provided");
        }

        return this.request(`/cms/api/public/v1/chart/id/${chartId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
