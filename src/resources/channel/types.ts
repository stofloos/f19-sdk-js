import { BaseResponse } from "../../types";

export declare type ChannelItem = {
    alias: string;
    name: string;
    outputStandard: string;
};

export declare interface ChannelResponse extends BaseResponse {
    payload: Array<ChannelItem> | [];
}
