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
     * @returns {Promise<ChannelResponse>}
     * @example
     * const channel = await client.channel.getAll()
     */
    async getAll(preview: boolean = false): Promise<ChannelResponse> {
        return this.get(`/${resource}`, preview).then(response => {
            return response.json();
        });
    }
}
