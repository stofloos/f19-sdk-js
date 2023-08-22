export declare type Config = {
    apiKey: string; // API key to use for authentication.
    baseUrl: string; // Base url of the F19 instance to connect to.
};

export declare interface BaseResponse {
    errors: null;
    payload: any;
    statusCode: number;
}
