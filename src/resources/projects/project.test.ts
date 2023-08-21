import { Projects } from "./project";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

beforeAll(() => {
    jest.resetModules();
});

describe("Projects Resource", () => {
    const projects = new Projects({
        apiKey: apiKey,
        baseUrl: baseUrl
    });

    let projectId: string;

    it("should be instance of Projects", () => {
        expect(projects).toBeInstanceOf(Projects);
    });

    it("should throw error if id is not provided", () => {
        expect(() => {
            projects.getById("");
        }).toThrowError("No id provided");
    });

    it("should return projects", async () => {
        const project = await projects.getAll();

        if (project.payload?.[0]?.id) {
            projectId = project.payload?.[0]?.id;
        }

        expect(project).toEqual(
            expect.objectContaining({
                errors: null,
                payload: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String),
                        language: expect.any(String),
                        publishDate: expect.any(String)
                    })
                ]),
                statusCode: 200
            })
        );
    });

    it("should return project", async () => {
        const project = await projects.getById(projectId);

        expect(project).toEqual(
            expect.objectContaining({
                errors: null,
                payload: expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    language: expect.any(String),
                    publishDate: expect.any(String)
                }),
                statusCode: 200
            })
        );
    });
});
