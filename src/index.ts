import Projects from "./resources/projects";
import Websites from "./resources/websites";
import Reports from "./resources/reports";
import Articles from "./resources/articles";
import Charts from "./resources/charts";
import Assets from "./resources/assets";
import Channel from "./resources/channel";
import FacetNavigations from "./resources/facetNavigations";
import Images from "./resources/images";
import Nonce from "./resources/nonce";
import Tables from "./resources/tables";
import Downloads from "./resources/downloads";
import Tokens from "./resources/tokens";
import { generateClientToken, generateRequestToken } from "./helpers/jwt";

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
    article: Block;
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

/**
 * Client for interacting with the F19 API
 * @class Client
 * @constructor Client
 * @param {Config} config
 * @property {Projects} projects
 * @property {Websites} websites
 * @property {Reports} reports
 * @property {Articles} articles
 * @property {Assets} assets
 * @property {Charts} charts
 * @property {Channel} items
 * @property {FacetNavigations} facetNavigations
 * @property {Images} images
 * @property {Nonce} nonce
 * @property {Tables} tables
 * @property {Index} items
 * @property {Tokens} tokens
 * @throws Error
 */
export default class Client {
    projects: Projects;
    websites: Websites;
    reports: Reports;
    articles: Articles;
    assets: Assets;
    charts: Charts;
    channel: Channel;
    facetNavigations: FacetNavigations;
    images: Images;
    nonce: Nonce;
    tables: Tables;
    downloads: Downloads;
    tokens: Tokens;
    config: Config;

    /**
     * Create a new instance of the client
     * @param {Config} config
     * @throws Error
     * @constructor Index
     *
     */
    constructor(config: Config) {
        if (!config.apiKey) {
            throw new Error("API-key not configured");
        }

        if (!config.baseUrl) {
            throw new Error("Base URL not configured");
        }
        this.config = {
            apiKey: config.apiKey,
            baseUrl: config.baseUrl,
            apiPath: config.apiPath || "/cms/api/public/v1",
            clientId: config.clientId
        };
        this.projects = new Projects(this);
        this.websites = new Websites(this);
        this.reports = new Reports(this);
        this.articles = new Articles(this);
        this.assets = new Assets(this);
        this.charts = new Charts(this);
        this.channel = new Channel(this);
        this.facetNavigations = new FacetNavigations(this);
        this.images = new Images(this);
        this.nonce = new Nonce(this);
        this.tables = new Tables(this);
        this.downloads = new Downloads(this);
        this.tokens = new Tokens(this);
    }

    public async getRequestToken(uri: string, method: string) {
        const jwtSecret = this.config.apiKey;
        const claims = {
            ClientId: this.config.clientId
        };

        //Generate Client token
        const clientToken = await generateClientToken(claims, jwtSecret);
        if (!clientToken) throw new Error("no ClientToken");

        //Use Client token to get anonymous session token
        const token = await this.tokens.getAnonymousToken({
            headers: {
                "X-F19-ClientToken": clientToken
            }
        });
        if (!token) throw new Error("no ClientToken");

        //Use anonymous session token to generate request token
        const requestToken = await generateRequestToken({
            sessionKey: token.payload,
            uri: uri,
            clientId: this.config.clientId,
            method: method
        });

        return requestToken;
    }
}
