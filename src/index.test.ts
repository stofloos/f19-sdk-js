import Client from "./index";
import "isomorphic-fetch";
import Reports from "./resources/reports/report";
import { Projects } from "./resources/projects/project";

const config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

describe("Index instance", () => {
    const client = new Client(config);

    it("should be instance of Client", () => {
        expect(client).toBeInstanceOf(Client);
    });

    it("should throw error if api key is not configured", () => {
        expect(() => {
            new Client({
                apiKey: "",
                baseUrl: "https://api.f19.rocks"
            });
        }).toThrowError("API-key not configured");
    });

    it("should throw error if base url is not configured", () => {
        expect(() => {
            new Client({
                apiKey: "123",
                baseUrl: ""
            });
        }).toThrowError("Base URL not configured");
    });

    it("should throw error if invalid api key is provided", async () => {
        const newClient = new Client({
            ...config,
            apiKey: "123"
        });
        await expect(newClient.projects.getAll()).rejects.toThrowError(
            "Unauthorized"
        );
    });

    it("should contain Projects instance", () => {
        expect(client).toHaveProperty("projects");
        expect(client.projects).toBeInstanceOf(Projects);
        expect(client.projects).toHaveProperty("getAll");
        expect(client.projects).toHaveProperty("getById");
    });

    it("should contain Websites instance", () => {
        expect(client).toHaveProperty("websites");
        expect(client.websites).toHaveProperty("getAll");
        expect(client.websites).toHaveProperty("getByAlias");
    });

    it("should contain Reports instance", () => {
        expect(client).toHaveProperty("reports");
        expect(client.reports).toBeInstanceOf(Reports);
        expect(client.reports).toHaveProperty("getAllByProjectId");
        expect(client.reports).toHaveProperty("getById");
    });

    it("should contain Articles instance", () => {
        expect(client).toHaveProperty("articles");
        expect(client.articles).toHaveProperty("getAllByProjectId");
        expect(client.articles).toHaveProperty("getById");
    });
});
