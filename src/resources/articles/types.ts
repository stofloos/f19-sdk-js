import { Article, BaseResponse } from "../../types";

export declare interface ArticlesResponse extends BaseResponse {
    payload: Array<Article>;
}

export declare interface ArticleResponse extends BaseResponse {
    payload: Article | null;
}
