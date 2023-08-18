import { Base } from "../base";
import { ReportResponse, ReportsResponse } from "./types";

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
     * @returns {Promise<ReportResponse>}
     */
    getById(id: string): Promise<ReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/report/id/${id}`, {
            method: "GET"
        });
    }

    /**
     * Get all reports by project id
     * @param id
     * @returns {Promise<ReportResponse>}
     *
     */
    getAllByProjectId(id: string): Promise<ReportsResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/report/project/${id}`, {
            method: "GET"
        });
    }
}
