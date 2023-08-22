import Base from "../base";
import { ImageResponse, ImagesResponse } from "./types";

/**
 * Images resource
 * @export
 * @class Images
 * @extends {Base}
 * */
export default class Images extends Base {
    /**
     * Get all images for a project
     * @param projectId
     * @returns {Promise<any>}
     *
     */
    async getAll(projectId: string): Promise<ImagesResponse> {
        if (!projectId) {
            throw new Error("Project id is required");
        }
        return await this.request(
            `/cms/api/public/v1/image/project/${projectId}`
        ).then(response => {
            return response.json();
        });
    }

    /**
     * Get image by id
     * @param imageId
     * @returns {Promise<any>}
     */
    async getById(imageId: string): Promise<ImageResponse> {
        if (!imageId) {
            throw new Error("Image id is required");
        }

        return await this.request(
            `/cms/api/public/v1/image/id/${imageId}`
        ).then(response => {
            return response.json();
        });
    }
}
