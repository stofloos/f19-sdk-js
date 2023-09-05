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
     * @param preview
     * @returns {Promise<string>}
     */
    async getImageByName(
        projectId: string,
        name: string,
        preview: boolean = false
    ): Promise<Blob> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No asset name provided");
        }

        return this.get(
            `/${resource}/image/project/${projectId}/name/${name}`,
            preview
        ).then(response => {
            return response.blob();
        });
    }

    /**
     * Get download by name
     * @param projectId
     * @param name
     * @param preview
     * @returns {Promise<Blob>}
     */
    async getDownloadByName(
        projectId: string,
        name: string,
        preview: boolean = false
    ): Promise<Blob> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No name provided");
        }

        return this.get(
            `/${resource}/download/project/${projectId}/name/${name}`,
            preview
        ).then(response => {
            return response.blob();
        });
    }

    /**
     * Get asset blob by token
     * @param token
     * @param preview
     * @returns {Promise<Blob>}
     */
    async getBlobByToken(
        token: string,
        preview: boolean = false
    ): Promise<Blob> {
        if (!token || token === "") {
            throw new Error("No token provided");
        }

        return this.get(`/${resource}/blob/ticket/${token}`, preview).then(
            response => {
                return response.blob();
            }
        );
    }
}
