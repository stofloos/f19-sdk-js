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
     * @return {Promise<string>}
     * */
    async getNonce(preview: boolean = false): Promise<NonceResponse> {
        return this.get(`/${resource}/generate`, preview).then(response => {
            return response.json();
        });
    }
}
