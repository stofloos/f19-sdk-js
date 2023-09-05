import Base from "../base";
import { ChannelResponse } from "./types";

const resource = "channel";
export default class Index extends Base {
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
