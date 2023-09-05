import Base from "../base";
import { ReportResponse, ReportsResponse } from "./types";
const resource = "report";
/**
 * Client for interacting with the F19 API
 * @class Reports
 * @constructor Reports
 * @param {Config} config
 * @method getById - Get a report by id
 * @method getAllByProjectId - Get all reports by project id
 * @example
 *
 */
export default class Reports extends Base {
    /**
     * Get a report by id
     * @param id
     * @param preview
     * @returns {Promise<ReportResponse>}
     */
    async getById(id: string, preview = false): Promise<ReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, preview).then(response => {
            return response.json();
        });
    }

    /**
     * Get all reports by project id
     * @param id
     * @returns {Promise<ReportResponse>}
     *
     */
    async getAllByProjectId(id: string): Promise<ReportsResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/${resource}/project/${id}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
