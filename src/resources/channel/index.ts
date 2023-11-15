import Base from "../base";
import { BaseResponse } from "../../index";

export type ChannelItem = {
    alias: string;
    name: string;
    outputStandard: string;
};

export interface ChannelResponse extends BaseResponse {
    payload: Array<ChannelItem>;
}

const resource = "channel";
export default class Channel extends Base {
    /**
     * Get all channels
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<ChannelResponse>}
     * @example
     * const channel = await client.channel.getAll()
     */
    async getAll(
        options: RequestInit = {},
        token?: string
    ): Promise<ChannelResponse> {
        return this.get(`/${resource}`, token, options).then(response => {
            return response.json();
        });
    }
}
