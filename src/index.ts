import { Projects } from "./resources/projects/project";

export type Config = {
    apiKey: string; // API key to use for authentication.
    baseUrl: string; // Base url of the F19 instance to connect to.
};

export default class Client  {
    projects: Projects;

    constructor(config: Config) {
        if (!config.apiKey) {
            throw new Error("Api key not configured");
        }

        if (!config.baseUrl) {
            throw new Error("Base url not configured");
        }

        this.projects = new Projects(config);
    }
}
