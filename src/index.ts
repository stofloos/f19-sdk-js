import { Projects } from "./resources/projects/project";
import type { Config } from "./types";
import Websites from "./resources/websites/website";

/**
 * Client for interacting with the F19 API
 * @class Client
 * @constructor Client
 * @param {Config} config
 * @property {Projects} projects
 * @property {Websites} websites
 */
export default class Client  {
    /**
     * Client resources
     * @property {Projects} projects
     * @property {Websites} websites
     */
    projects: Projects;
    websites: Websites;

    /**
     * Create a new instance of the client
     * @param {Config} config
     * @throws Error
     * @constructor Client
     *
     */
    constructor(config: Config) {

        if (!config.apiKey) {
            throw new Error("Api key not configured");
        }

        if (!config.baseUrl) {
            throw new Error("Base url not configured");
        }
        this.websites = new Websites(config);
        this.projects = new Projects(config);
    }
}
