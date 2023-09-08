import Base from "../base";
import { TokenResponse } from "./types";

const resource = "token";
/**
 * Tokens resource
 * @class Tokens
 * @extends Base
 */
export default class Tokens extends Base {
    /**
     * Get a personal token
     * @param authorizationToken
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getPersonal(authorizationToken: string): Promise<TokenResponse> {
        if (!authorizationToken || authorizationToken === "") {
            throw new Error("Authorization token is required");
        }

        return this.post(
            `/${resource}/personal?authorizationToken=${authorizationToken}`
        ).then(response => response.json());
    }

    /**
     * Get an anonymous token
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getAnonymous(): Promise<TokenResponse> {
        return this.post(`/${resource}/anonymous`).then(response =>
            response.json()
        );
    }

    /**
     * Get a thumbprint token
     * @async
     * @param userId
     * @param thumbPrint
     * @return {Promise<TokenResponse>}
     */
    async getThumbprint(
        userId: string,
        thumbPrint: string
    ): Promise<TokenResponse> {
        if (!userId || userId === "") {
            throw new Error("UserId token is required");
        }

        if (!thumbPrint || thumbPrint === "") {
            throw new Error("Thumbprint token is required");
        }
        return this.post(
            `/${resource}/thumbprint?userId=${userId}&thumbprint=${thumbPrint}`
        ).then(response => response.json());
    }
}
