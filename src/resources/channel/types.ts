import { BaseResponse } from "../../types";

export declare interface ChannelResponse extends BaseResponse {
    nextNonce: string;
    statusCode: number;
    errors: null;
    payload: Array<ChannelItem> | [];
}

export declare type ChannelItem = {
    alias: string;
    name: string;
    outputStandard: string;
};
