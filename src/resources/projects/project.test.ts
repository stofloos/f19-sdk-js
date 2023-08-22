import Projects from "./project";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

const config = {
    apiKey: apiKey,
    baseUrl: baseUrl
};

beforeAll(() => {
    jest.resetModules();
});

describe("Projects resource", () => {
    const projects = new Projects(config);

    let projectId: string;

    it("should be instance of Projects", () => {
        expect(projects).toBeInstanceOf(Projects);
    });

    it("should throw error if id is not provided", async () => {
        await expect(projects.getById("")).rejects.toThrowError(
            "No id provided"
        );
    });

    it("should return projects", async () => {
        const project = await projects.getAll();

        if (project.payload?.[0]?.id) {
            projectId = project.payload?.[0]?.id;
        }

        expect(project).toHaveProperty("payload");
        expect(project.payload).toBeInstanceOf(Array);
    });

    it("should return project", async () => {
        const project = await projects.getById(projectId);

        expect(project).toHaveProperty("payload");
        expect(project.payload).toHaveProperty("id");
    });
});
