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

export interface BlokTags {
    id?: string;
    name?: string;
    "name-url"?: string;
    "project-id"?: string;
    "focal-point-x"?: number;
    "focal-point-y"?: number;
    "version-id"?: null;
    level?: number | string;
    target?: string;
    "is-visible"?: boolean;
    "first-of-sequence"?: string;
    "last-of-sequence"?: string;
    "next-item-level"?: number;
}

export type Channel = "*" | "chwebsite" | "chtablet" | "chphone" | "chpdf";

export type TagsType = "image" | "article";

export type EventType = "image-not-available" | "article-not-available";

export type Config = {
    apiKey: string; // API key to use for authentication.
    baseUrl: string; // Base url of the F19 instance to connect to.
    apiPath?: string; // Path to the API on the F19 instance.
};

export type Error = {
    message: "string";
    details: {
        [key: string]: string | number | boolean;
    };
};

export interface BaseResponse {
    errors: Error;
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
    "f19-meta-level:"?: string;
    "f19-meta-channel:"?: string;
    "settings-reference"?: string;
}

export interface MultiChannelTag {
    channel: Channel;
}

export type Event = {
    message: string;
    type: EventType;
    category: string;
    level: number;
    tags: EventTags;
    channels: Array<string>;
};

//TODO: Add typings to ChannelResource
export type ChannelResource = {};

export interface BlockChannelTag extends MultiChannelTag {
    tags: BlokTags;
}

export interface BlockInterface {
    multiChannelTags: Array<{ [key: string]: any }>;
    id: string;
    events: Array<Event>;
}

export interface Block extends BlockInterface {
    type: BlockType;
    text: string | null;
    multiChannelResources: Array<ChannelResource>;
    multiChannelTags: Array<BlockChannelTag>;
    blocks: Array<Block>;
}

export interface HeadingTags extends Tags {
    "first-of-sequence"?: string;
    "last-of-sequence"?: string;
    "next-item-level"?: number;
}

export interface HeadingMultiChannelTag extends MultiChannelTag {
    tags: HeadingTags;
}

export interface ComponentHeading extends Block {
    type: "heading";
    blocks: Array<Block>;
    multiChannelTags: Array<HeadingMultiChannelTag>;
}

interface ComponentTags extends Tags {
    articleCode?: string;
    publication?: string;
    "f19-meta-channel:"?: string;
    spread?: string;
    hideHeading?: string;
    "f19-meta-page-break:"?: string;
    "f19-meta-headerfooter:"?: string;
    "parent-id"?: string;
}

interface ComponentMultiChannelTag {
    channel: Channel;
    tags: ComponentTags;
}

export interface ComponentInterface extends BlockInterface {
    type: ComponentType;
    reportId: string;
    urlSegment: string;
    heading: ComponentHeading;
    level: number;
    language: string;
    blocks: Array<Block>;
    text: string;
    multiChannelTags: Array<ComponentMultiChannelTag>;
}

interface CoverTags extends Tags {
    name?: string;
    "name-url"?: string;
    "f19-meta-page-break:"?: string;
    "f19-meta-headerfooter:"?: string;
}

interface CoverMultiChannelTag extends MultiChannelTag {
    channel: Channel;
    tags: CoverTags;
}

export interface Cover extends ComponentInterface {
    type: "cover";
    multiChannelTags: Array<CoverMultiChannelTag>;
}

interface SlipSheetTags extends Tags {
    spread?: string;
    hideHeading?: string;
    "settings-reference"?: string;
    "f19-meta-page-break:"?: string;
    "f19-meta-headerfooter:"?: string;
}

interface SlipSheetMultiChannelTag extends MultiChannelTag {
    tags: SlipSheetTags;
}

export interface SlipSheet extends ComponentInterface {
    type: "slipsheet";
    multiChannelTags: Array<SlipSheetMultiChannelTag>;
}

export interface Heading extends ComponentInterface {
    type: "heading";
    multiChannelTags: Array<HeadingMultiChannelTag>;
}

export interface TableOfContentsTags extends Tags {
    "f19-meta-page-break:"?: string;
    "f19-meta-headerfooter:"?: string;
}

export interface TableOfContentsMultiChannelTag extends MultiChannelTag {
    tags: TableOfContentsTags;
}

export interface TableOfContents extends ComponentInterface {
    type: "tableofcontents";
    multiChannelTags: Array<TableOfContentsMultiChannelTag>;
}

export type Component = Cover & SlipSheet & Heading & TableOfContents;
