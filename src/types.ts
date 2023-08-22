export declare type Config = {
    apiKey: string; // API key to use for authentication.
    baseUrl: string; // Base url of the F19 instance to connect to.
};

export declare interface BaseResponse {
    errors: null;
    payload: any;
    statusCode: number;
}

export declare type Event = {
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
    multiChannelTags: Array<ChannelTag>;
    blocks: Array<Block>;
    text: string;
    id: string;
    type: string;
    multiChannelResources: Array<ChannelResource>;
    events: Array<Event>;
};

export declare type ChannelTag = {
    channel: string;
    tags: {
        [key: string]: string | number | boolean;
    };
};
