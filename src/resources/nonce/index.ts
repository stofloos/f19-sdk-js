import Base from "../base";
import { NonceResponse } from "./types";

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
    async getNonce(): Promise<NonceResponse> {
        return this.request("/cms/api/public/v1/nonce/generate", {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
