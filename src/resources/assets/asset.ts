import { Base } from "../base";

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
     * @returns {Promise<string>}
     */
    async getImageByName(projectId: string, name: string): Promise<Blob> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No asset name provided");
        }

        return this.request(
            `/cms/api/public/v1/assets/image/project/${projectId}/name/${name}`,
            {
                method: "GET"
            }
        ).then(response => {
            return response.blob();
        });
    }

    /**
     * Get download by name
     * @param projectId
     * @param name
     * @returns {Promise<AssetResponse>}
     */
    async getDownloadByName(projectId: string, name: string): Promise<Blob> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        if (!name || name === "") {
            throw new Error("No name provided");
        }

        return this.request(
            `/cms/api/public/v1/assets/download/project/${projectId}/name/${name}`,
            {
                method: "GET"
            }
        ).then(response => {
            return response.blob();
        });
    }

    /**
     * Get asset blob by name
     * @param token
     * @returns {Promise<string>}
     */
    async getAssetBlobByToken(token: string): Promise<string> {
        if (!token || token === "") {
            throw new Error("No token provided");
        }

        return this.request(
            `GET /cms/api/public/v1/assets/blob/ticket/${token}`,
            {
                method: "GET"
            }
        )
            .then(response => {
                return response.blob();
            })
            .then(blob => {
                return URL.createObjectURL(blob);
            });
    }
}
