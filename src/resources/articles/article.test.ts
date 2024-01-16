import Articles from "./";
import "isomorphic-fetch";

import { config } from "../../helpers/testing";
import Client from "../../index";

describe("Articles resource", () => {
    const client = new Client(config);
    const articlesResource = client.articles;

    it("should be instance of Articles", () => {
        expect(articlesResource).toBeInstanceOf(Articles);
    });

    it("should throw error if project id is not provided", async () => {
        await expect(
            articlesResource.getAllByProjectId("")
        ).rejects.toThrowError("Project id not provided");
    });

    it("should throw error if invalid project id is provided", async () => {
        await expect(
            articlesResource.getAllByProjectId("123")
        ).resolves.toHaveProperty("payload");
    });

    it("should be able to get articles by project id", async () => {
        // Get all projects
        const projectsResponse = await client.projects.getAll();

        // Get the first project id
        const projectId = projectsResponse?.payload?.[0]?.id;

        // Get all articles by project id
        if (projectId) {
            const articlesResponse = await articlesResource.getAllByProjectId(
                projectId
            );

            expect(articlesResponse).toHaveProperty("payload");
        }
    });
});
