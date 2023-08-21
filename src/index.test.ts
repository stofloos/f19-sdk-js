import Client from "./index";
import "isomorphic-fetch";
import Reports from "./resources/reports/report";
import { Projects } from "./resources/projects/project";
import Channel from "./resources/channel/channel";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

const client = new Client({
    apiKey: apiKey,
    baseUrl: baseUrl
});

describe("Index instance", () => {
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

    it("should contain Channel instance", () => {
        expect(client).toHaveProperty("channel");
        expect(client.channel).toBeInstanceOf(Channel);
        expect(client.channel).toHaveProperty("getAll");
    });
});
