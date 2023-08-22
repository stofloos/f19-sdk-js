import Projects from "./resources/projects";
import type { Config } from "./types";
import Websites from "./resources/websites";
import Reports from "./resources/reports";
import Articles from "./resources/articles";
import Charts from "./resources/charts";
import Assets from "./resources/assets";
import Channel from "./resources/channel";
import FacetNavigations from "./resources/facetNavigations";
import Images from "./resources/images";
import Nonce from "./resources/nonce";
import Tables from "./resources/tables";
import Tokens from "./resources/tokens";

/**
 * Client for interacting with the F19 API
 * @class Client
 * @constructor Client
 * @param {Config} config
 * @property {Projects} projects
 * @property {Websites} websites
 * @property {Reports} reports
 * @property {Articles} articles
 * @property {Assets} assets
 * @property {Charts} charts
 * @property {Channel} items
 * @property {FacetNavigations} facetNavigations
 * @property {Images} images
 * @property {Nonce} nonce
 * @property {Tables} tables
 * @property {Tokens} tokens
 * @throws Error
 */
export default class Client {
    projects: Projects;
    websites: Websites;
    reports: Reports;
    articles: Articles;
    assets: Assets;
    charts: Charts;
    channel: Channel;
    facetNavigations: FacetNavigations;
    images: Images;
    nonce: Nonce;
    tables: Tables;
    tokens: Tokens;

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
        this.articles = new Articles(config);
        this.assets = new Assets(config);
        this.charts = new Charts(config);
        this.channel = new Channel(config);
        this.facetNavigations = new FacetNavigations(config);
        this.images = new Images(config);
        this.nonce = new Nonce(config);
        this.tables = new Tables(config);
        this.tokens = new Tokens(config);
    }
}
