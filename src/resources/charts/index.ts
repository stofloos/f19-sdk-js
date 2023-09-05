import Base from "../base";
import { ChartsResponse, ChartResponse } from "./types";
const resource = "chart";
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
     * @param preview
     * @returns {Promise<ChartsResponse>}
     */
    async getAll(
        projectId: string,
        preview: boolean = false
    ): Promise<ChartsResponse> {
        return this.get(`/${resource}/project/${projectId}`, preview).then(
            response => {
                return response.json();
            }
        );
    }

    /**
     * Get chart by id
     * @param chartId
     * @param preview
     * @returns {Promise<ChartResponse>}
     */
    async getById(
        chartId: string,
        preview: boolean = false
    ): Promise<ChartResponse> {
        if (!chartId || chartId === "") {
            throw new Error("No chart id provided");
        }

        return this.get(`/${resource}/id/${chartId}`, preview).then(
            response => {
                return response.json();
            }
        );
    }
}
