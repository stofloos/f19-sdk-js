import Base from "../base";

const resource = "assets";

/**
 * Assets resource
 * @class
 * @extends Base
 */
export default class Assets extends Base {
    /**
     * Get image by name
     * @param {string} projectId - The project ID.
     * @param {string} name - The name of the image.
     * @returns {Promise<Response>} A Promise that resolves to a Blob.
     */
    async getImageByName(projectId: string, name: string): Promise<Response> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No asset name provided");
        }

        return await this.get(
            `/${resource}/image/project/${projectId}/name/${name}`
        );
    }

    /**
     * Get download by name
     * @param {string} projectId - The project ID.
     * @param {string} name - The name of the download.
     * @returns {Promise<Response>} A Promise that resolves to a Blob.
     */
    async getDownloadByName(
        projectId: string,
        name: string
    ): Promise<Response> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No name provided");
        }

        return await this.get(
            `/${resource}/download/project/${projectId}/name/${name}`
        );
    }

    /**
     * Get asset blob by token
     * @param {string} ticket - The ticket.
     * @returns {Promise<Response>} A Promise that resolves to a Response.
     */
    async getBlobByToken(ticket: string): Promise<Response> {
        if (!ticket || ticket === "") {
            throw new Error("No token provided");
        }

        return await this.get(`/${resource}/blob/ticket/${ticket}`);
    }
}
