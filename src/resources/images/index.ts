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
     * @param options
     * @returns {Promise<any>}
     */
    async getAll(
        projectId: string,
        options?: RequestInit
    ): Promise<ImagesResponse> {
        if (!projectId) {
            throw new Error("Project id is required");
        }
        return await this.get(
            `/${resource}/project/${projectId}`,
            options
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
