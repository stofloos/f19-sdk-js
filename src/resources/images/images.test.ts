import "isomorphic-fetch";
import Images from "./";
import Projects from "../projects";
import { Config } from "../../types";

const config: Config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

describe("Images resource", () => {
    const imagesResource = new Images(config);

    let imageId = "";

    it("should throw an error if project id is not provided", async () => {
        await expect(imagesResource.getAll("")).rejects.toThrow(
            "Project id is required"
        );
    });

    it("should get all images for a project", async () => {
        // Get a project id

        // New projects resource instance
        const projectsResource = new Projects(config);

        // Get all projects
        const projects = await projectsResource.getAll();

        // Get the first project id
        const projectId = projects.payload[0].id;
        // Get all images for the project

        expect(projectId).toBeDefined();

        const imagesResponse = await imagesResource.getAll(projectId);

        imageId = imagesResponse?.payload?.[0]?.id;

        expect(imagesResponse).toHaveProperty("payload");
    });

    it("should throw an error if image id is not provided", async () => {
        await expect(imagesResource.getById("")).rejects.toThrow(
            "Image id is required"
        );
    });

    it("should get an image by id", async () => {
        const imageResponse = await imagesResource.getById(imageId);
        expect(imageResponse).toHaveProperty("payload");
        expect(imageResponse.payload).toHaveProperty("id");

        if (imageResponse?.payload && imageResponse.payload.id) {
            expect(imageResponse.payload.id).toEqual(imageId);
        }
    });
});
