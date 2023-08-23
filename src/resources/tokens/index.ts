import Base from "../base";
import { TokenResponse } from "./types";

/**
 * Tokens resource
 * @class Tokens
 * @extends Base
 */
export default class Tokens extends Base {
    /**
     * token request helper
     * @param url
     * @param authorizationToken
     * @async
     * @return {Promise<TokenResponse>}
     */
    async tokenRequest(
        url: string,
        authorizationToken: string
    ): Promise<TokenResponse> {
        if (!authorizationToken || authorizationToken === "") {
            throw new Error("Authorization token is required");
        }

        return this.request(url, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    /**
     * Get a personal token
     * @param authorizationToken
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getPersonal(authorizationToken: string): Promise<TokenResponse> {
        return this.tokenRequest(
            "/cms/api/public/v1/token/personal",
            authorizationToken
        );
    }

    /**
     * Get an anonymous token
     * @param authorizationToken
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getAnonymous(authorizationToken: string): Promise<TokenResponse> {
        return this.tokenRequest(
            "/cms/api/public/v1/token/anonymous",
            authorizationToken
        );
    }

    /**
     * Get a thumbprint token
     * @param authorizationToken
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getThumbprint(authorizationToken: string): Promise<TokenResponse> {
        return this.tokenRequest(
            "/cms/api/public/v1/token/thumbprint",
            authorizationToken
        );
    }
}
