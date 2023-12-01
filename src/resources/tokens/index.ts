import Base from "../base";
import { BaseResponse } from "../../index";

export declare type Token = {
    userId: number;
    thumbprint: string;
    key: string;
};

export declare interface TokenResponse extends BaseResponse {
    payload: Token;
}

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
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getPersonalToken(
        authorizationToken: string,
        options: RequestInit = {},
        token?: string
    ): Promise<TokenResponse> {
        if (!authorizationToken || authorizationToken === "") {
            throw new Error("Authorization token is required");
        }

        return this.post(
            `/${resource}/personal?authorizationToken=${authorizationToken}`,
            token,
            options
        ).then(response => response.json());
    }

    /**
     * Get an anonymous token
     * @async
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @return {Promise<TokenResponse>}
     */
    async getAnonymousToken(
        options: RequestInit = {},
        token?: string
    ): Promise<TokenResponse> {
        return this.post(`/${resource}/anonymous`, token, options, null).then(
            response => response.json()
        );
    }

    /**
     * Get a thumbprint token
     * @async
     * @param userId
     * @param thumbPrint
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @return {Promise<TokenResponse>}
     */
    async getThumbprint(
        userId: string,
        thumbPrint: string,
        options: RequestInit = {},
        token?: string
    ): Promise<TokenResponse> {
        if (!userId || userId === "") {
            throw new Error("UserId token is required");
        }

        if (!thumbPrint || thumbPrint === "") {
            throw new Error("Thumbprint token is required");
        }
        return this.post(
            `/${resource}/thumbprint?userId=${userId}&thumbprint=${thumbPrint}`,
            token,
            options
        ).then(response => response.json());
    }
}
