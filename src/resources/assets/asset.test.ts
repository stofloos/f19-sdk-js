import Assets from "./";
import Projects from "../projects";
import Reports from "../reports";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";

describe("Asset Resource", () => {
    const assets = new Assets(config);

    it("should be instance of Assets", () => {
        expect(assets).toBeInstanceOf(Assets);
    });

    it("should resolve blob of asset", async () => {
        // New instance of Projects
        const projectsClient = new Projects(config);

        // Get all projects
        const projects = await projectsClient.getAll();

        // Get project id
        const projectId = projects.payload?.[0]?.id;

        // New instance of Reports
        const reportsClient = new Reports(config);

        // Get all reports by project id
        const reports = await reportsClient.getAllByProjectId(projectId);

        // Get an image block of a first component in the first report.
        const imageBlock = reports.payload?.[0]?.components?.[0]?.blocks?.find(
            block => block?.type.match(/main-image/g)
        );

        // Get image name from first multiChannelTag from first Block in image block.
        const imageName =
            imageBlock?.blocks?.[0]?.multiChannelTags?.[0]?.tags?.name;

        // Get image blob by name
        expect(imageName).toBeDefined();
        expect(projectId).toBeDefined();
        if(!imageName) {
            await expect(assets.getImageByName(projectId, imageName!)).rejects.toThrowError();
        } else {
            await expect(assets.getImageByName(projectId, imageName!)).resolves.toBeDefined();
        }
    });

    it("should throw error if asset name is not provided", async () => {
        await expect(assets.getImageByName("123", "")).rejects.toThrowError(
            "No asset name provided"
        );
    });

    it("should throw error if no token is provided", async () => {
        await expect(assets.getBlobByToken("")).rejects.toThrowError(
            "No token provided"
        );
    });
});
