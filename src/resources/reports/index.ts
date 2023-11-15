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
        channel: ChannelType = "*",
        options: RequestInit = {},
        token?: string
    ): Promise<ReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, token, options)
            .then(response => {
                return response.json();
            })
            .then((data: ReportResponse) => {
                if (channel && data.payload) {
                    // If a channel is provided,
                    // filter out components without the specified channel
                    const filteredComponents = filterComponentsByChannel({
                        components: data.payload.components,
                        channel
                    });

                    return {
                        ...data,
                        payload: {
                            ...data.payload,
                            components: filteredComponents
                        }
                    };
                }

                return data;
            });
    }

    /**
     * Get all reports by project id
     * @param id
     * @param channel - Optional channel to filter by
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<ReportResponse>}
     *
     */
    async getAllByProjectId(
        id: string,
        channel: ChannelType = "*",
        token?: string,
        options?: RequestInit
    ): Promise<ReportsResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/project/${id}`, token, options)
            .then(response => {
                return response.json();
            })
            .then((data: ReportsResponse) => {
                if (channel && data.payload) {
                    // If a channel is provided,
                    // filter out reports without the specified channel
                    data.payload = data.payload.filter((report: Report) => {
                        return report.components.some(
                            (component: Component) => {
                                if (channel !== "*") {
                                    const channelTags =
                                        component?.multiChannelTags.find(
                                            (tag: MultiChannelTag) =>
                                                tag.channel === channel
                                        );

                                    return (
                                        channelTags?.tags?.["is-visible"] !==
                                        false
                                    );
                                }
                                return true;
                            }
                        );
                    });
                }
                return data;
            });
    }

    /**
     * Create a custom report
     * @param id
     * @param channel
     * @param componentIds
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<Response>}
     */
    async createCustomReport(
        {
            id,
            channel = "*",
            componentIds = []
        }: {
            id: string;
            channel?: ChannelType;
            componentIds?: Array<string>;
        },
        options: RequestInit = {},
        token?: string
    ): Promise<Response> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.post(
            `/${resource}/custom/id/${id}/channel/${channel}`,
            token,
            {
                body: JSON.stringify(componentIds),
                ...options
            }
        ).then(response => response);
    }

    /**
     * Create a custom async report
     * @param id
     * @param channel
     * @param componentIds
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<CustomAsyncReportResponse>}
     */
    async createCustomAsyncReport(
        {
            id,
            channel = "*",
            componentIds = []
        }: {
            id: string;
            channel?: ChannelType;
            componentIds?: Array<string>;
        },
        options: RequestInit = {},
        token?: string
    ): Promise<CustomAsyncReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.post(
            `/${resource}/custom_async/id/${id}/channel/${channel}`,
            token,
            {
                ...options,
                body: JSON.stringify({
                    componentIds
                })
            }
        ).then(response => response.json());
    }

    /**
     * Get custom report progress by id
     * @param id
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<CustomAsyncReportResponse>}
     */
    async getCustomReportProgress(
        id: string,
        options: RequestInit = {},
        token?: string
    ): Promise<CustomAsyncReportResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(
            `/${resource}/custom_progress/id/${id}`,
            token,
            options
        ).then(response => response.json());
    }
}
