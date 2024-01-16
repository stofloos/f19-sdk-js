import Projects from "./";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";
beforeAll(() => {
    jest.resetModules();
});

describe("Projects resource", () => {
    const projects = new Client(config).projects;

    it("should be instance of Projects", () => {
        expect(projects).toBeInstanceOf(Projects);
    });

    it("should be able to get all projects", async () => {
        const projectsResponse = await projects.getAll();
        expect(projectsResponse).toHaveProperty("payload");
    });
});
