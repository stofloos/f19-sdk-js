import Base from "../base";
import { BaseResponse, Download } from "../../index";

export interface DownloadsFromProjectResponse extends BaseResponse {
    payload: Array<Download>;
}

export interface DownloadResponse extends BaseResponse {
    payload: Download | null;
}

const resource = "download";

export default class Index extends Base {
    /**
     * Get a report by id
     * @param {string} id - The ID of the report.
     * @returns {Promise<DownloadResponse>} A Promise that resolves to a DownloadResponse.
     */
    async getById(id: string): Promise<DownloadResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        const response = await this.get(`/${resource}/id/${id}`);
        const json = await response.json();
        return json;
    }

    /**
     * Get all downloads by projectId
     * @param {string} projectId - The project ID.
     * @returns {Promise<DownloadsFromProjectResponse>} A Promise that resolves to a DownloadsFromProjectResponse.
     */
    async getAllByProjectId(
        projectId: string
    ): Promise<DownloadsFromProjectResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No projectId provided");
        }

        const response = await this.get(`/${resource}/project/${projectId}`);
        const json = await response.json();
        return json;
    }
}
