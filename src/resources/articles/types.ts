import { Block, ChannelTag } from "../reports/types";

export declare type Article = {
    id: string;
    urlSegment: string;
    projectId: string;
    language: string;
    heading: Block;
    summary: string;
    type: string;
    teaserImage: Block;
    headerImage: Block;
    blocks: Array<Block> | [];
    facetIds: Array<string> | [];
    relatedArticleIds: Array<string> | [];
    reportIds: Array<string> | [];
    multiChannelTags: Array<ChannelTag> | [];
    summaryLevel: number;
};

export declare interface ArticlesResponse extends Response {
    payload: Array<Article> | [];
}

export declare interface ArticleResponse extends Response {
    payload: Article;
}
