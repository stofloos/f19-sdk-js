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
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @return {Promise<string>}
     * */
    async getNonce(
        options: RequestInit = {},
        token?: string
    ): Promise<NonceResponse> {
        return this.get(`/${resource}/generate`, token, options).then(
            response => {
                return response.json();
            }
        );
    }
}
