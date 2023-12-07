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
     * @returns {Promise<ChannelResponse>} A Promise that resolves to a ChannelResponse.
     * @example
     * const channel = await client.channel.getAll()
     */
    async getAll(): Promise<ChannelResponse> {
        const response = await this.get(`/${resource}`);
        const json = await response.json();
        return json;
    }
}
