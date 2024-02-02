import Projects from "./resources/projects";
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
import Downloads from "./resources/downloads";
import Tokens from "./resources/tokens";
import { generateClientToken, generateRequestToken } from "./helpers/jwt";
import type { Config, ImpersonationOptions } from "./types";

export * from "./types";

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
 * @property {Index} items
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
    downloads: Downloads;
    tokens: Tokens;
    config: Config;
    impersonationOptions?: ImpersonationOptions;
    clientToken: string | undefined;

    /**
     * Create a new instance of the client
     * @param {Config} config
     * @param impersonationOptions
     * @throws Error
     * @constructor Index
     *
     */
    constructor(config: Config, impersonationOptions?: ImpersonationOptions) {
        if (!config.apiKey) {
            throw new Error("API-key not configured");
        }
        if (!config.baseUrl) {
            throw new Error("Base URL not configured");
        }
        this.config = {
            apiKey: config.apiKey,
            baseUrl: config.baseUrl,
            apiPath: config.apiPath || "/cms/api/public/v1",
            clientId: config.clientId
        };
        this.impersonationOptions = impersonationOptions;
        this.projects = new Projects(this);
        this.websites = new Websites(this);
        this.reports = new Reports(this);
        this.articles = new Articles(this);
        this.assets = new Assets(this);
        this.charts = new Charts(this);
        this.channel = new Channel(this);
        this.facetNavigations = new FacetNavigations(this);
        this.images = new Images(this);
        this.nonce = new Nonce(this);
        this.tables = new Tables(this);
        this.downloads = new Downloads(this);
        this.tokens = new Tokens(this);
        this.clientToken = undefined;
        this.creatClientToken();
    }

    private setClientToken(token: string): void {
        this.clientToken = token;
    }

    private getClientToken(): string | undefined {
        return this.clientToken;
    }

    private creatClientToken() {
        const jwtSecret = this.config.apiKey;
        const claims = {
            ClientId: this.config.clientId
        };

        generateClientToken(claims, jwtSecret).then(token => {
            this.setClientToken(token);
        });
    }

    public async getRequestToken(
        uri: string,
        method?: RequestInit["method"],
        options?: RequestInit
    ): Promise<string> {
        const clientToken = this.getClientToken();

        if (!clientToken) {
            throw new Error("no clientToken");
        }

        const token = await this.tokens.getAnonymousToken(clientToken, options);

        // If a user is logged in get thumbprint token
        // if (this.impersonationOptions) {
        //     token = await this.tokens.getThumbprint(
        //         clientToken,
        //         this.impersonationOptions.userId,
        //         this.impersonationOptions.keyThumbprint
        //     );
        // }

        if (!token) {
            throw new Error("no SessionKey");
        }

        //Use a session key to generate request token
        return await generateRequestToken({
            sessionKey: token.payload,
            uri: uri,
            clientId: this.config.clientId,
            method
        });
    }

    public getAuthUrl(callbackUrl: string) {
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return `${this.config.baseUrl}/cms/login/authorize/${this.config.clientId}?callback=${encodedCallbackUrl}`;
    }
}
