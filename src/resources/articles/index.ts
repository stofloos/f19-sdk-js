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
export default class Articles extends Base {
    /**
     * Get all articles for a project
     * @method getAllByProjectId
     * @param projectId
     * @returns {Promise<ArticlesResponse>}
     * @throws Error
     *
     */
    async getAllByProjectId(projectId: string): Promise<ArticlesResponse> {
        if (!projectId || projectId === "") {
            throw new Error("Project id not provided");
        }

        return this.request(`/cms/api/public/v1/article/project/${projectId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    /**
     * Get an article by id
     * @method getById
     * @param articleId
     * @returns {Promise<ArticleResponse>}
     * @throws Error
     */
    async getById(articleId: string): Promise<ArticleResponse> {
        if (!articleId || articleId === "") {
            throw new Error("Article id not provided");
        }

        return this.request(`/cms/api/public/v1/article/${articleId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
