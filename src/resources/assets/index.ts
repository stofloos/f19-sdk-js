import Base from "../base";
const resource = "assets";
/**
 * Assets resource
 * @class
 * @extends Base
 *
 */
export default class Assets extends Base {
    /**
     * Get image by name
     * @param projectId
     * @param name
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<string>}
     */
    async getImageByName(
        projectId: string,
        name: string,
        options: RequestInit = {},
        token?: string
    ): Promise<Blob> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No asset name provided");
        }

        return this.get(
            `/${resource}/image/project/${projectId}/name/${name}`,
            token,
            options
        ).then(response => {
            return response.blob();
        });
    }

    /**
     * Get download by name
     * @param projectId
     * @param name
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Blob>}
     */
    async getDownloadByName(
        projectId: string,
        name: string,
        options: RequestInit = {},
        token?: string
    ): Promise<Blob> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No name provided");
        }

        return this.get(
            `/${resource}/download/project/${projectId}/name/${name}`,
            token,
            options
        ).then(response => {
            return response.blob();
        });
    }

    /**
     * Get asset blob by token
     * @param ticket
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async getBlobByToken(
        ticket: string,
        options: RequestInit = {},
        token?: string
    ): Promise<Response> {
        if (!ticket || ticket === "") {
            throw new Error("No token provided");
        }

        return this.get(
            `/${resource}/blob/ticket/${ticket}`,
            token,
            options
        ).then(response => {
            return response;
        });
    }
}
