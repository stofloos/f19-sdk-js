import Base from "../base";
import { ImageResponse, ImagesResponse } from "./types";

const resource = "image";
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
     * @param preview
     * @returns {Promise<any>}
     */
    async getAll(projectId: string, preview = false): Promise<ImagesResponse> {
        if (!projectId) {
            throw new Error("Project id is required");
        }
        return await this.get(
            `/${resource}/project/${projectId}`,
            preview
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

        return await this.get(`/${resource}/id/${imageId}`).then(response => {
            return response.json();
        });
    }
}
