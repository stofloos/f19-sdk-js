import Base from "../base";
import { BaseResponse, Token } from "../../types";

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
     * @param clientToken
     * @param authorizationToken
     * @async
     * @return {Promise<TokenResponse>}
     */
    async getPersonalToken(
        clientToken: string,
        authorizationToken: string
    ): Promise<TokenResponse> {
        const response = await this.post(
            `/${resource}/personal`,
            {
                headers: {
                    "X-F19-ClientToken": clientToken
                },
                body: authorizationToken
            },
            null
        );
        return await response.json();
    }

    /**
     * Get an anonymous token
     * @async
     * @param {string} clientToken - The client token
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @return {Promise<TokenResponse>}
     */
    async getAnonymousToken(
        clientToken: string,
        options?: RequestInit
    ): Promise<TokenResponse> {
        const response = await this.post(
            `/${resource}/anonymous`,
            {
                ...options,
                headers: {
                    "X-F19-ClientToken": clientToken,
                    ...(options?.headers ?? {})
                }
            },
            null
        );
        return await response.json();
    }

    /**
     * Get a thumbprint token
     * @async
     * @param clientToken
     * @param userId
     * @param thumbPrint
     * @return {Promise<TokenResponse>}
     */
    async getThumbprint(
        clientToken: string,
        userId: string,
        thumbPrint: string
    ): Promise<TokenResponse> {
        if (!userId || userId === "") {
            throw new Error("UserId token is required");
        }

        if (!thumbPrint || thumbPrint === "") {
            throw new Error("Thumbprint token is required");
        }

        const response = await this.post(
            `/${resource}/thumbprint?userId=${userId}&thumbprint=${thumbPrint}`,
            {
                headers: {
                    "X-F19-ClientToken": clientToken
                }
            },
            null
        );
        return await response.json();
    }
}
