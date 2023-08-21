import Assets from "./asset";
import { Projects } from "../projects/project";
import Reports from "../reports/report";
import "isomorphic-fetch";

const config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

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

        // Get first project id
        const projectId = projects.payload?.[0]?.id;

        // New instance of Reports
        const reportsClient = new Reports(config);

        // Get all reports by project id
        const reports = await reportsClient.getAllByProjectId(projectId);

        // Get block of type image in blocks of first component of first report.
        const imageBlock = reports.payload?.[0]?.components?.[0]?.blocks?.find(
            block => block.type.match(/image/i)
        );

        // Get image name from first multiChannelTag from first Block in image block.
        const imageName = imageBlock?.blocks?.[0]?.multiChannelTags?.[0]?.tags
            ?.name as string;

        // Get image blob by name
        expect(imageName).toBeDefined();
        expect(projectId).toBeDefined();

        const imageBlob = await assets.getImageByName(projectId, imageName);

        expect(imageBlob).toBeDefined();
    });

    it("should throw error if asset name is not provided", async () => {
       await expect( assets.getImageByName("123", "")).rejects.toThrowError("No asset name provided");
    });

    it("should throw error if no token is provided", async () => {
      await  expect( assets.getAssetBlobByToken("")).rejects.toThrowError("No token provided");
    });
});
