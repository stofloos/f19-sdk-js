export type Editclass =
    | "f19-cover"
    | "f19-toc"
    | "f19-article"
    | "f19-slipsheet"
    | "f19-header";

export type ComponentType =
    | "cover"
    | "tableofcontents"
    | "article"
    | "slipsheet"
    | "heading";

export type BlockType =
    | "image"
    | "paragraph"
    | "run"
    | "heading"
    | "main-image"
    | "subtitle"
    | "tableofcontentsitem";

export type ChannelType = "*" | "chwebsite" | "chtablet" | "chphone" | "chpdf";

export type TagsType = "image" | "article";

export type EventType = "image-not-available" | "article-not-available";

export type Config = {
    apiKey: string; // API key to use for authentication.
    baseUrl: string; // Base url of the F19 instance to connect to.
    apiPath?: string; // Path to the API on the F19 instance.
    clientId: string; // Client id to use it for authentication.
};

export type ImpersonationOptions = {
    userId: string;
    keyThumbprint: string;
    cacheDifferentiator: string;
    authorizationToken: string;
};

export type Error = {
    message: "string";
    details: {
        [key: string]: string | number | boolean;
    };
};

export interface BaseResponse {
    errors: Error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    statusCode: number;
}

export interface EventTags {
    type: TagsType;
    key: string;
    "project-alias": string;
    "project-id": string;
}

export interface Tags {
    editclass?: Editclass | string;
    "is-visible"?: boolean;
    "show-in-header-footer"?: string;
    "f19-meta-level"?: string;
    "f19-meta-channel"?: string;
    "settings-reference"?: string;
}

export interface VideoTags extends Tags {
    "video-src": string;
}

export interface MultiChannelTag {
    channel: ChannelType;
    tags: ImageTags &
        ArticleTags &
        HeadingTags &
        ComponentTags &
        CoverTags &
        SlipSheetTags &
        TableOfContentsTags &
        VideoTags & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key: string]: any;
        };
}

export type Event = {
    message: string;
    type: EventType;
    category: string;
    level: number;
    tags: EventTags;
    channels: Array<string>;
};

export type ChannelResourceType = "json" | string;

type Resource = {
    content: string;
    name: string;
    type: ChannelResourceType;
};

export type ChannelResource = {
    channel: ChannelType;
    resources: Array<Resource>;
};

export interface Block {
    multiChannelTags: Array<MultiChannelTag>;
    multiChannelResources?: Array<ChannelResource>;
    id: string;
    type: BlockType | string;
    text: string;
    events: Array<Event>;
    blocks: Array<Block>;
}

export interface ImageTags extends Tags {
    id: string;
    name: string;
    "name-url": string;
    "project-id": string;
    "focal-point-x": number;
    "focal-point-y": number;
    "version-id": string | null;
}

export interface Image extends Block {
    type: "image";
    blocks: Array<Block>;
}

export interface HeadingTags extends Tags {
    "first-of-sequence"?: string;
    "last-of-sequence"?: string;
    "next-item-level"?: number;
}

export interface ComponentHeading extends Block {
    type: "heading";
    blocks: Array<Block>;
}

// Components
interface ComponentTags extends Tags {
    articleCode?: string;
    publication?: string;
    "f19-meta-channel"?: string;
    spread?: string;
    hideHeading?: string;
    "f19-meta-page-break"?: string;
    "f19-meta-headerfooter"?: string;
    "parent-id"?: string;
}

export interface ComponentInterface extends Block {
    type: ComponentType;
    reportId: string;
    urlSegment: string;
    heading: ComponentHeading;
    level: number;
    language: string;
    blocks: Array<Block | Image>;
    text: string;
}

interface CoverTags extends Tags {
    name?: string;
    "name-url"?: string;
    "f19-meta-page-break"?: string;
    "f19-meta-headerfooter"?: string;
}

export interface Cover extends ComponentInterface {
    type: "cover";
    components: Array<Component>;
}

interface SlipSheetTags extends Tags {
    spread?: string;
    hideHeading?: string;
    "settings-reference"?: string;
    "f19-meta-page-break"?: string;
    "f19-meta-headerfooter"?: string;
}

export interface SlipSheet extends ComponentInterface {
    type: "slipsheet";
}

export interface Heading extends ComponentInterface {
    type: "heading";
}

export interface TableOfContentsTags extends Tags {
    "f19-meta-page-break"?: string;
    "f19-meta-headerfooter"?: string;
}

export interface TableOfContents extends ComponentInterface {
    type: "tableofcontents";
}

export declare interface ArticleTags extends Tags {
    articleCode?: string;
    publication?: string;
    "parent-id"?: string;
}

export declare interface Article extends ComponentInterface {
    type: "article";
    urlSegment: string;
    projectId: string;
    language: string;
    summary: string;
    articleId?: string;
    article: Block & {
        headerImage: Image;
        teaserImage: Image;
        summary: string;
    };
    teaserImage: Image;
    headerImage: Image;
    facetIds: Array<string>;
    relatedArticleIds: Array<string>;
    reportIds: Array<string>;
    summaryLevel: number;
}

export declare interface Report extends Block {
    summaryLevel: number;
    name: string;
    urlSegment: string;
    projectId: string;
    language: string;
    components: Array<Component>;
    facetNavigations: null;
    articleIds: Array<string>;
}

export interface Download {
    text: string;
    securedProjectId: number;
    id: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocks: Array<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    multiChannelResources: Array<any>;
    multiChannelTags: Array<MultiChannelTag>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: Array<any>;
}

export type Component = Cover | SlipSheet | Heading | TableOfContents | Article;

export declare type Route = {
    id: string;
    parentId: string | null;
    name: string;
    urlSegment: string;
    sortOrder: number;
    url: string;
    block: Block | null;
};

export declare type Website = {
    id: string;
    name: string;
    alias: string;
    routes: Array<Route>;
};

export declare type Facet = {
    id: string;
    name: string;
    urlSegment: string;
    facets: Array<Facet>;
};

export declare type FacetNavigation = {
    id: string;
    projectId: string;
    name: string;
    facets: Array<Facet>;
    securedProjectId: number;
};

export declare type Project = {
    id: string;
    name: string;
    language: string;
    publishDate: string;
};

export declare type Token = {
    userId: number;
    thumbprint: string;
    key: string;
};

export type CachedAnonymousToken = {
    uri: string;
    method?: RequestInit["method"];
    token: string;
    expires: number;
};

export type CachedAnonymousTokens = Map<string, CachedAnonymousToken>;
