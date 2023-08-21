export declare type ChannelResponse = {
    nextNonce: string;
    statusCode: number;
    errors: null;
    payload: Array<ChannelItem> | [];
};

export declare type ChannelItem = {
    alias: string;
    name: string;
    outputStandard: string;
};
