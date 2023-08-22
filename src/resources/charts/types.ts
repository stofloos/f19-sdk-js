import { Block, ChannelResource, ChannelTag } from "../../types";
import { BaseResponse } from "../../types";

export type Chart = {
    multiChannelResources: Array<ChannelResource>;
    id: string;
    text: string;
    type: string;
    blocks: Array<Block>;
    multiChannelTags: Array<ChannelTag>;
    events: Array<Event>;
};

export declare interface ChartResponse extends BaseResponse {
    payload: Chart | null;
}

export declare interface ChartsResponse extends BaseResponse {
    payload: Array<Chart> | [];
}
