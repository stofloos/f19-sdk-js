import Base from "../base";
import { Block, ChannelResource } from "../../index";
import { BaseResponse } from "../../index";

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
 * @export
 * @class Images
 * @extends {Base}
 * */
export default class Images extends Base {
    /**
     * Get all images for a project
     * @param projectId
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<any>}
     */
    async getAll(
        projectId: string,
        options: RequestInit = {},
        token?: string
    ): Promise<ImagesResponse> {
        if (!projectId) {
            throw new Error("Project id is required");
        }
        return await this.get(
            `/${resource}/project/${projectId}`,
            token,
            options
        ).then(response => {
            return response.json();
        });
    }

    /**
     * Get image by id
     * @param imageId
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<any>}
     */
    async getById(
        imageId: string,
        options: RequestInit = {},
        token?: string
    ): Promise<ImageResponse> {
        if (!imageId) {
            throw new Error("Image id is required");
        }

        return await this.get(
            `/${resource}/id/${imageId}`,
            token,
            options
        ).then(response => {
            return response.json();
        });
    }
}
