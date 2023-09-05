import Base from "../base";
import {
    ReportComponent,
    Report,
    ReportResponse,
    ReportsResponse
} from "./types";
import { Channel } from "../../types";

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
     * @param channel
     * @returns {Promise<ReportResponse>}
     */
    async getById(id: string, channel?: Channel): Promise<ReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/report/id/${id}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then((data: ReportResponse) => {
                if (channel && data.payload) {
                    // If channel is provided, filter out components without the specified channel
                    data.payload.components = data.payload.components.filter(
                        (component: ReportComponent) => {
                            return component.multiChannelTags.some(
                                tag => tag.channel === channel
                            );
                        }
                    );
                }
                return data;
            });
    }

    /**
     * Get all reports by project id
     * @param id
     * @param channel
     * @returns {Promise<ReportResponse>}
     *
     */
    async getAllByProjectId(
        id: string,
        channel?: Channel
    ): Promise<ReportsResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/report/project/${id}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then((data: ReportsResponse) => {
                if (channel && data.payload) {
                    // If channel is provided, filter out reports without the specified channel
                    data.payload = data.payload.filter((report: Report) => {
                        return report.components.some(
                            (component: ReportComponent) => {
                                return component.multiChannelTags.some(
                                    tag => tag.channel === channel
                                );
                            }
                        );
                    });
                }
                return data;
            });
    }
}
