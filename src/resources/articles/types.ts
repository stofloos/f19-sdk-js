import {
    BaseResponse,
    BlockInterface,
    ComponentInterface,
    MultiChannelTag,
    Tags
} from "../../types";
export declare interface ArticleTags extends Tags {
    articleCode?: string;
    publication?: string;
    "parent-id"?: string;
}

export declare interface ArticleMultiChannelTag extends MultiChannelTag {
    tags: ArticleTags;
}

export declare interface Article extends ComponentInterface {
    type: "article";
    multiChannelTags: Array<ArticleMultiChannelTag>;
    urlSegment: string;
    projectId: string;
    language: string;
    summary: string;
    teaserImage: BlockInterface;
    headerImage: BlockInterface;
    facetIds: Array<string>;
    relatedArticleIds: Array<string>;
    reportIds: Array<string>;
    summaryLevel: number;
}

export declare interface ArticlesResponse extends BaseResponse {
    payload: Array<Article>;
}

export declare interface ArticleResponse extends BaseResponse {
    payload: Article | null;
}
