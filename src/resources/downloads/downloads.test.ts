import Index from "./index";
import "isomorphic-fetch";
import Projects from "../projects";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

const config = {
    apiKey: apiKey,
    baseUrl: baseUrl
};

beforeAll(() => {
    jest.resetModules();
});

describe("Downloads resource", () => {
    const downloads = new Index(config);

    let downloadId: string;

    it("should be instance of Projects", () => {
        expect(downloads).toBeInstanceOf(Index);
    });

    it("should throw error if id is not provided", async () => {
        await expect(downloads.getAllByProjectId("")).rejects.toThrowError(
            "No id provided"
        );
    });

    it("should return downloads by project id", async () => {
        // Projects instance
        const projectClient = new Projects(config);

        // Get all projects
        const projects = await projectClient.getAll();

        // Get first project id from projects
        const projectId = projects?.payload?.[0]?.id;

        // Get downloads by project id
        const downloadsResponse = await downloads.getAllByProjectId(projectId);

        downloadId = downloadsResponse?.payload?.[0]?.id;

        expect(downloadsResponse).toHaveProperty("payload");
        expect(downloadsResponse.payload).toBeInstanceOf(Array);
    });

    it("should throw error if id is not provided", async () => {
        await expect(downloads.getById("")).rejects.toThrowError(
            "No id provided"
        );
    });

    it("should throw error if invalid download id is provided", async () => {
        await expect(downloads.getById("123")).rejects.toThrowError(
            "Forbidden"
        );
    });

    it("should return download by id", async () => {
        const download = await downloads.getById(downloadId);
        expect(download.payload?.id).toEqual(downloadId);
    });
});
