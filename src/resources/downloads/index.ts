import Base from "../base";
import { BaseResponse } from "../../index";
export interface DownloadsFromProjectResponse extends BaseResponse {
    payload: Array<Download>;
}

export interface DownloadResponse extends BaseResponse {
    payload: Download | null;
}

interface Download {
    text: string;
    securedProjectId: number;
    id: string;
    type: string;
    blocks: Array<any>;
    multiChannelResources: Array<any>;
    multiChannelTags: Array<MultiChannelTag>;
    events: Array<any>;
}

interface MultiChannelTag {
    channel: string;
    tags: {
        id: string;
        name: string;
        "name-url": string;
        extension: string;
        filesize: number;
        "project-id": string;
        "version-id": string;
    };
}

const resource = "download";
export default class Index extends Base {
    /**
     * Get a report by id
     * @param id
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<DownloadResponse>}
     */
    async getById(
        id: string,
        options: RequestInit = {},
        token?: string
    ): Promise<DownloadResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, token, options).then(
            response => {
                return response.json();
            }
        );
    }

    /**
     * Get all downloads by projectId
     * @param projectId
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<DownloadsFromProjectResponse>}
     */
    async getAllByProjectId(
        projectId: string,
        options: RequestInit = {},
        token?: string
    ): Promise<DownloadsFromProjectResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No id provided");
        }

        return this.get(
            `/${resource}/project/${projectId}`,
            token,
            options
        ).then(response => {
            return response.json();
        });
    }
}
