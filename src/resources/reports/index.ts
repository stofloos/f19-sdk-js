import Base from "../base";
import {
    Component,
    Report,
    ReportChannel,
    ReportResponse,
    ReportsResponse
} from "./types";

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
    async getById(
        id: string,
        channel?: ReportChannel
    ): Promise<ReportResponse> {
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
                        (component: Component) => {
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
        channel?: ReportChannel
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
                            (component: Component) => {
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
