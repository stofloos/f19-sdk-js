import { Projects } from "./resources/projects/project";
import type { Config } from "./types";
import Websites from "./resources/websites/website";
import Reports from "./resources/reports/report";

/**
 * Client for interacting with the F19 API
 * @class Client
 * @constructor Client
 * @param {Config} config
 * @property {Projects} projects
 * @property {Websites} websites
 * @property {Reports} reports
 */
export default class Client  {
    /**
     * Client resources
     * @property {Projects} projects
     * @property {Websites} websites
     */
    projects: Projects;
    websites: Websites;
    reports: Reports;

    /**
     * Create a new instance of the client
     * @param {Config} config
     * @throws Error
     * @constructor Client
     *
     */
    constructor(config: Config) {

        if (!config.apiKey) {
            throw new Error("API-key not configured");
        }

        if (!config.baseUrl) {
            throw new Error("Base URL not configured");
        }

        this.projects = new Projects(config);
        this.websites = new Websites(config);
        this.reports = new Reports(config);
    }
}
