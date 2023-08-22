import { Block, ChannelResource, ChannelTag } from "../../types";
import { BaseResponse } from "../../types";

export declare type Image = {
    id: string;
    text: string;
    type: string;
    multiChannelTags: Array<ChannelTag>;
    blocks: Array<Block>;
    multiChannelResources: Array<ChannelResource>;
    events: Array<Event>;
};

export declare interface ImagesResponse extends BaseResponse {
    payload: Array<Image> | [];
}
export declare interface ImageResponse extends BaseResponse {
    payload: Image | null;
}
