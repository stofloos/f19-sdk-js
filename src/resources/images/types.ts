import { Block, ChannelResource } from "../../types";
import { BaseResponse } from "../../types";

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
