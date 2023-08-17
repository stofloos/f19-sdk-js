import { Projects } from "./project";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

const projects = new Projects({
    apiKey: apiKey,
    baseUrl: baseUrl
});

beforeAll(() => {
    jest.resetModules();
});

describe("Projects Instance", () => {
    it("should be instance of Projects", () => {
        expect(projects).toBeInstanceOf(Projects);
    });
});

describe("Get project by ID", () => {
    it("should throw error if id is not provided", () => {
        expect(() => {
            projects.getById("");
        }).toThrowError("No id provided");
    });

    it("should return project", async () => {

        const project = await projects.getById(
            "f9f9e70a-03e8-0000-f884-fdaf7d6313ed"
        );

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

describe("Get projects", () => {
    it("should return projects", async () => {
        const project = await projects.getAll();

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
});
