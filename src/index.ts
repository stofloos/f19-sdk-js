export type Config = {
    apiKey: string; // API key to use for authentication.
    baseUrl: string; // Base url of the F19 instance to connect to.
};

export default class Client {
    constructor(config: Config) {
        if (!config.apiKey) {
            throw new Error("Api key not configured");
        }

        if (!config.baseUrl) {
            throw new Error("Base url not configured");
        }
    }
}
