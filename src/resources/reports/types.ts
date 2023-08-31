import { BaseResponse, Block, ChannelResource, ChannelTag } from "../../types";

export enum ReportChannel {
    WEBSITE = "chwebsite",
    TABLET = "chtablet",
    PHONE = "chphone",
    PDF = "chpdf",
    ALL = "*"
}

export declare type Component = {
    id: string;
    reportId: string;
    type: string;
    urlSegment: string;
    heading: {
        type: string;
        id: string;
        blocks: Array<Block> | [];
        multiChannelResources: Array<ChannelResource>[];
        multiChannelTags: Array<ChannelTag> | [];
        text: null;
        events: Array<Event> | [];
    };
    level: 0;
    multiChannelTags: Array<ChannelTag> | [];
    blocks: Array<Block>;
    events: Array<Event>;
};

export declare type Report = {
    summaryLevel: number;
    name: string;
    id: string;
    urlSegment: string;
    projectId: string;
    language: string;
    components: Array<Component>;
    facetNavigations: null;
    multiChannelTags: Array<ChannelTag>;
    events: Array<Event> | [];
    articleIds: Array<string>[];
};

export declare interface ReportResponse extends BaseResponse {
    payload: Report | null;
}

export declare interface ReportsResponse extends BaseResponse {
    payload: Array<Report> | [];
}
