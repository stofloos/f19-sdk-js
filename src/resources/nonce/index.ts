import Base from "../base";
import { BaseResponse } from "../../types";

export declare interface NonceResponse extends BaseResponse {
    payload: string | null;
}

const resource = "nonce";

/**
 * Nonce resource
 * @class Nonce
 * @extends Base
 */
export default class Nonce extends Base {
    /**
     * Generate a nonce
     * @async
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<NonceResponse>} A Promise that resolves to a NonceResponse.
     */
    async getNonce(options?: RequestInit): Promise<NonceResponse> {
        const response = await this.get(`/${resource}/generate`, options || {});
        return await response.json();
    }
}
