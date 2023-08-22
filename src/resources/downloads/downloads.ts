import Base from "../base";
import { DownloadResponse, DownloadsFromProjectResponse } from "./types";

export default class Downloads extends Base {
    /**
     * Get a report by id
     * @param id
     * @returns {Promise<DownloadResponse>}
     */
    async getById(id: string): Promise<DownloadResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/download/id/${id}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    /**
     * Get all downloads by projectId
     * @param projectId
     * @returns {Promise<DownloadsFromProjectResponse>}
     * @example
     * const downloads = awaits client.downloads.getById("[PROJECT_ID]]")
     */
    async getAllByProjectId(
        projectId: string
    ): Promise<DownloadsFromProjectResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No id provided");
        }

        return this.request(
            `/cms/api/public/v1/download/project/${projectId}`,
            {
                method: "GET"
            }
        ).then(response => {
            return response.json();
        });
    }
}
