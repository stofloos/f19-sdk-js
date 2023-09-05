import Base from "../base";
import { ArticleResponse, ArticlesResponse } from "./types";

/**
 * Articles instance
 * @class Articles
 * @constructor Articles
 * @param {Config} config
 * @extends Base
 *
 */

const resource = "article";
export default class Articles extends Base {
    /**
     * Get all articles for a project
     * @method getAllByProjectId
     * @param projectId
     * @param preview
     * @returns {Promise<ArticlesResponse>}
     * @throws Error
     *
     */
    async getAllByProjectId(
        projectId: string,
        preview = false
    ): Promise<ArticlesResponse> {
        if (!projectId || projectId === "") {
            throw new Error("Project id not provided");
        }

        return this.get(`/${resource}/project/${projectId}`, preview).then(
            response => {
                return response.json();
            }
        );
    }

    /**
     * Get an article by id
     * @method getById
     * @param articleId
     * @param preview
     * @returns {Promise<ArticleResponse>}
     * @throws Error
     */
    async getById(
        articleId: string,
        preview = false
    ): Promise<ArticleResponse> {
        if (!articleId || articleId === "") {
            throw new Error("Article id not provided");
        }

        return this.get(`/${resource}/${articleId}`, preview).then(response => {
            return response.json();
        });
    }
}
