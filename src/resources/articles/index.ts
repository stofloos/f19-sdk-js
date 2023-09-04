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
     * @param channel
     * @returns {Promise<ArticlesResponse>}
     * @throws Error
     *
     */
    async getAllByProjectId(
        projectId: string,
        channel?: string
    ): Promise<ArticlesResponse> {
        if (!projectId || projectId === "") {
            throw new Error("Project id not provided");
        }

        return this.request(`/cms/api/public/v1/article/project/${projectId}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then((data: ArticlesResponse) => {
                if (channel && data.payload) {
                    // If channel is provided, filter out articles without the specified channel
                    data.payload = data.payload.filter(article => {
                        return article.multiChannelTags.some(
                            tag => tag.channel === channel
                        );
                    });
                }
                return data;
            });
    }

    /**
     * Get an article by id
     * @method getById
     * @param articleId
     * @param channel
     * @returns {Promise<ArticleResponse>}
     * @throws Error
     */
    async getById(
        articleId: string,
        channel?: string
    ): Promise<ArticleResponse> {
        if (!articleId || articleId === "") {
            throw new Error("Article id not provided");
        }

        return this.request(`/cms/api/public/v1/article/${articleId}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then((data: ArticleResponse) => {
                if (channel && data.payload) {
                    // If channel is provided, filter out articles without the specified channel
                    data.payload.multiChannelTags =
                        data.payload.multiChannelTags.filter(tag => {
                            return tag.channel === channel;
                        });
                }
                return data;
            });
    }
}
