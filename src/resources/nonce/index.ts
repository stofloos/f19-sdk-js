import Base from "../base";
import { BaseResponse } from "../../index";

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
     * @method getNonce
     * @async
     * @param options - Optional options to pass to fetch
     * @return {Promise<string>}
     * */
    async getNonce(options?: RequestInit): Promise<NonceResponse> {
        return this.get(`/${resource}/generate`, options).then(response => {
            return response.json();
        });
    }
}
