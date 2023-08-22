import FacetNavigations from "./facetNavigation";
import Projects from "../projects/project";
import "isomorphic-fetch";

const config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

describe("FacetNavigations Resource", () => {
    const facetNavigations = new FacetNavigations(config);

    let facetNavigationId: string;

    it("should be instance of FacetNavigations", () => {
        expect(facetNavigations).toBeInstanceOf(FacetNavigations);
    });

    it("should throw error if projectId is not provided", async () => {
        await expect(facetNavigations.getAll("")).rejects.toThrowError(
            "No project id provided"
        );
    });

    it("should get all facetNavigations", async () => {
        const projectsResource = new Projects(config);
        const projectsResponse = await projectsResource.getAll();

        const projectId = projectsResponse?.payload?.[0]?.id;

        const facetNavigationsResponse = await facetNavigations.getAll(
            projectId
        );

        facetNavigationId = facetNavigationsResponse?.payload?.[0]?.id;

        expect(facetNavigationsResponse).toHaveProperty("payload");
        expect(facetNavigationsResponse.payload).toBeInstanceOf(Array);
    });

    it("should get a facetNavigation by id", async () => {
        const faceNavigationResponse = await facetNavigations.getById(
            facetNavigationId
        );

        expect(faceNavigationResponse).toHaveProperty("payload");
        expect(faceNavigationResponse.payload).toBeInstanceOf(Object);
        expect(faceNavigationResponse.payload).toHaveProperty("id");
        expect(faceNavigationResponse.payload.id).toEqual(facetNavigationId);
    });
});
