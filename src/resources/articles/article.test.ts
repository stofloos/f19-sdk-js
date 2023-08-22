import Articles from "./article";
import Projects from "../projects/project";
import "isomorphic-fetch";

const config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

describe("Articles resource", () => {
    const articles = new Articles(config);

    it("should be instance of Articles", () => {
        expect(articles).toBeInstanceOf(Articles);
    });

    it("should throw error if project id is not provided", async () => {
        await expect(articles.getAllByProjectId("")).rejects.toThrowError(
            "Project id not provided"
        );
    });

    it("should throw error if invalid project id is provided", async () => {
        await expect(articles.getAllByProjectId("123")).rejects.toThrowError(
            "Forbidden"
        );
    });

    it("should be able to get articles by project id", async () => {
        // New instance of projects
        const projectsInstance = new Projects(config);

        // Get all projects
        const projectsResponse = await projectsInstance.getAll();

        // Get the first project id
        const projectId = projectsResponse?.payload?.[0]?.id;

        // Get all articles by project id
        const articlesResponse = await articles.getAllByProjectId(projectId!);

        expect(articlesResponse).toHaveProperty("payload");
        expect(articlesResponse.payload).toBeInstanceOf(Array);
    });
});
