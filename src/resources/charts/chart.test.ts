import Charts from "./";
import "isomorphic-fetch";
import Projects from "../projects";

const config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

describe("Charts resource", () => {
    const chartsResource = new Charts(config);

    let chartId: string;

    it("should be instance of Charts", () => {
        expect(chartsResource).toBeInstanceOf(Charts);
        expect(chartsResource).toHaveProperty("getById");
        expect(chartsResource).toHaveProperty("getAll");
    });

    it("should return charts", async () => {
        // New instance of projects
        const projectsClient = new Projects(config);

        // Get all projects
        const projects = await projectsClient.getAll();

        // Get the first project id
        const projectId = projects?.payload?.[0]?.id;

        // Get all charts by project id
        const charts = await chartsResource.getAll(projectId);

        chartId = charts?.payload?.[0]?.id;

        expect(charts).toHaveProperty("payload");
        expect(charts.payload).toBeInstanceOf(Array);
    });

    it("should throw error if id is not provided", async () => {
        await expect(chartsResource.getById("")).rejects.toThrowError(
            "No chart id provided"
        );
    });

    it("should throw error if invalid id is provided", async () => {
        await expect(chartsResource.getById("123")).rejects.toThrowError(
            "Forbidden"
        );
    });

    it("should return chart by id", async () => {
        const chart = await chartsResource.getById(chartId);
        expect(chart.payload?.id).toEqual(chartId);
    });
});
