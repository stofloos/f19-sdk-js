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
     * @returns {Promise<NonceResponse>} A Promise that resolves to a NonceResponse.
     */
    async getNonce(): Promise<NonceResponse> {
        const response = await this.get(`/${resource}/generate`);
        const json = await response.json();
        return json;
    }
}
