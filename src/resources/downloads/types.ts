export declare interface DownloadsFromProjectResponse extends Response {
    nextNonce: string;
    statusCode: number;
    errors: null;
    payload: Array<Download>;
}

export declare interface DownloadResponse extends Response {
    nextNonce: string;
    statusCode: number;
    errors: null;
    payload: Download | null;
}

interface Download {
    text: string;
    securedProjectId: number;
    id: string;
    type: string;
    blocks: Array<any>;
    multiChannelResources: Array<any>;
    multiChannelTags: Array<MultiChannelTag>;
    events: Array<any>;
}

interface MultiChannelTag {
    channel: string;
    tags: {
        id: string;
        name: string;
        "name-url": string;
        extension: string;
        filesize: number;
        "project-id": string;
        "version-id": string;
    };
}
