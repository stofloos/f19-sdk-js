import Base from "../base";
import {
    ChannelType,
    Component,
    MultiChannelTag,
    BaseResponse,
    Report
} from "../../index";
import { filterComponentsByChannel } from "../../helpers/components";

export declare interface ReportResponse extends BaseResponse {
    payload: Report | null;
}

export declare interface CustomReportResponse extends BaseResponse {
    payload: string | null;
}

export declare type ReportProgress = {
    id: string;
    progress: number;
    state: number;
    downloadBlobToken: string;
};

export declare interface CustomAsyncReportResponse extends BaseResponse {
    payload: ReportProgress | null;
}

export declare interface ReportsResponse extends BaseResponse {
    payload: Array<Report>;
}

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
     * @param channel - Optional channel to filter by
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<ReportResponse>}
     */
    async getById(
        id: string,
        channel: ChannelType = "*"
    ): Promise<ReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        const response = await this.get(`/${resource}/id/${id}`);
        const json = await response.json();
        if (channel && json.payload) {
            // If a channel is provided,
            // filter out components without the specified channel
            const filteredComponents = filterComponentsByChannel({
                components: json.payload.components,
                channel
            });

            return {
                ...json,
                payload: {
                    ...json.payload,
                    components: filteredComponents
                }
            };
        }

        return json;
    }

    /**
     * Get all reports by project id
     * @param id
     * @param channel - Optional channel to filter by
     * @returns {Promise<ReportResponse>}
     *
     */
    async getAllByProjectId(
        id: string,
        channel: ChannelType = "*"
    ): Promise<ReportsResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        const response = await this.get(`/${resource}/project/${id}`);
        const json = await response.json();
        if (channel && json.payload) {
            // If a channel is provided,
            // filter out reports without the specified channel
            json.payload = json.payload.filter((report: Report) => {
                return report.components.some((component: Component) => {
                    if (channel !== "*") {
                        const channelTags = component?.multiChannelTags.find(
                            (tag: MultiChannelTag) => tag.channel === channel
                        );

                        return channelTags?.tags?.["is-visible"] !== false;
                    }
                    return true;
                });
            });
        }
        return json;
    }

    /**
     * Create a custom report
     * @param id
     * @param channel
     * @param componentIds
     * @returns {Promise<Response>}
     */
    async createCustomReport({
        id,
        channel = "*",
        componentIds = []
    }: {
        id: string;
        channel?: ChannelType;
        componentIds?: Array<string>;
    }): Promise<Response> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        const response = await this.post(
            `/${resource}/custom/id/${id}/channel/${channel}`,
            {
                body: JSON.stringify({
                    componentIds
                })
            }
        );

        return response;
    }

    /**
     * Create a custom async report
     * @param id
     * @param channel
     * @param componentIds
     * @returns {Promise<CustomAsyncReportResponse>}
     */
    async createCustomAsyncReport({
        id,
        channel = "*",
        componentIds = []
    }: {
        id: string;
        channel?: ChannelType;
        componentIds?: Array<string>;
    }): Promise<CustomAsyncReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        const response = await this.post(
            `/${resource}/custom_async/id/${id}/channel/${channel}`,
            {
                body: JSON.stringify({
                    componentIds
                })
            }
        );

        const json = await response.json();
        return json;
    }

    /**
     * Get custom report progress by id
     * @param id
     * @returns {Promise<CustomAsyncReportResponse>}
     */
    async getCustomReportProgress(
        id: string
    ): Promise<CustomAsyncReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        const response = await this.get(
            `/${resource}/custom_progress/id/${id}`
        );
        const json = await response.json();
        return json;
    }
}
