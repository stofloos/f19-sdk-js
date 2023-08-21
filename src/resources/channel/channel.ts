import Base from "../base";
import { ChannelResponse } from "./types";

export default class Channel extends Base {
    /**
     * Get all channels
     * @returns {Promise<ChannelResponse>}
     * @example
     * const channel = await client.channel.getAll()
     */
    async getAll(): Promise<ChannelResponse> {
        return this.request(`/cms/api/public/v1/channel`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
