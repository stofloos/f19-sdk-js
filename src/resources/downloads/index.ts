import Base from "../base";
import { DownloadResponse, DownloadsFromProjectResponse } from "./types";

const resource = "download";
export default class Index extends Base {
    /**
     * Get a report by id
     * @param id
     * @param preview
     * @returns {Promise<DownloadResponse>}
     */
    async getById(id: string, preview = false): Promise<DownloadResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, preview).then(response => {
            return response.json();
        });
    }

    /**
     * Get all downloads by projectId
     * @param projectId
     * @param preview
     * @returns {Promise<DownloadsFromProjectResponse>}
     */
    async getAllByProjectId(
        projectId: string,
        preview = false
    ): Promise<DownloadsFromProjectResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/project/${projectId}`, preview).then(
            response => {
                return response.json();
            }
        );
    }
}
