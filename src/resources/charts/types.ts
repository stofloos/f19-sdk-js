import { Block, ChannelResource, ChannelTag } from "../reports/types";

export type Chart = {
    multiChannelResources: Array<ChannelResource>;
    id: string;
    text: string;
    type: string;
    blocks: Array<Block>;
    multiChannelTags: Array<ChannelTag>;
    events: Array<Event>;
};

export declare interface ChartResponse extends Response {
    payload: Chart;
}

export declare interface ChartsResponse extends Response {
    payload: Array<Chart>;
}
