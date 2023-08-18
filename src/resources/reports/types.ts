export declare type Event =  {
    message: string;
    type: string;
    category: string;
    level: string;
    tags: {
        [key: string]: string | number | boolean;
    };
    channels: Array<string> | [];
};

export declare type ChannelResource = {};

export declare type Block = {
    multiChannelTags: Array<ChannelTag>[];
    blocks: Array<Block> | [];
    text: string;
    id: string;
    type: string;
    multiChannelResources: Array<ChannelResource> | [];
    events: Array<Event> | [];
};

export declare type ChannelTag = {
    channel: string;
    tags: {
        [key: string]: string | number | boolean;
    };
};

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
    blocks: Array<Block> | [];
    events: Array<Event> | [];
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
    multiChannelTags: Array<ChannelTag>[];
    events: Array<Event> | [];
    articleIds: Array<string>[];
};

export declare interface ReportResponse extends Response {
    payload: Report;
}

export declare interface ReportsResponse extends Response {
    payload: Array<Report> | [];
}
