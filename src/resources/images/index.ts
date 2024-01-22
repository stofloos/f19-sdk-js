import Base from "../base";
import { BaseResponse, Block, ChannelResource } from "../../types";

export declare interface ChannelTag {}

export declare interface ImageChannelTag {
    channel: string;
    tags: ChannelTag;
}

export declare type Image = {
    id: string;
    text: string;
    type: string;
    multiChannelTags: Array<ImageChannelTag>;
    blocks: Array<Block>;
    multiChannelResources: Array<ChannelResource>;
    events: Array<Event>;
};

export declare interface ImagesResponse extends BaseResponse {
    payload: Array<Image>;
}

export declare interface ImageResponse extends BaseResponse {
    payload: Image | null;
}

const resource = "image";

/**
 * Images resource
 * @class Images
 * @extends {Base}
 */
export default class Images extends Base {
    /**
     * Get all images for a project
     * @param {string} projectId - The project ID.
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<ImagesResponse>} A Promise that resolves to an ImagesResponse.
     */
    async getAll(
        projectId: string,
        options?: RequestInit
    ): Promise<ImagesResponse> {
        if (!projectId) {
            throw new Error("Project id is required");
        }

        const response = await this.get(
            `/${resource}/project/${projectId}`,
            options || {}
        );
        return await response.json();
    }

    /**
     * Get image by id
     * @param {string} imageId - The image ID.
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<ImageResponse>} A Promise that resolves to an ImageResponse.
     */
    async getById(
        imageId: string,
        options?: RequestInit
    ): Promise<ImageResponse> {
        if (!imageId) {
            throw new Error("Image id is required");
        }

        const response = await this.get(
            `/${resource}/id/${imageId}`,
            options || {}
        );
        return await response.json();
    }
}
