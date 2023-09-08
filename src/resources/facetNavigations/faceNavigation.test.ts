import FacetNavigations from "../facetNavigations";
import Projects from "../projects";
import "isomorphic-fetch";

import { config } from "../../helpers/testing";

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

        const projectId =
            projectsResponse?.payload?.[0] &&
            projectsResponse?.payload?.[0]?.id;

        const facetNavigationsResponse =
            await facetNavigations.getAll(projectId);

        facetNavigationId = facetNavigationsResponse?.payload?.[0]?.id;

        expect(facetNavigationsResponse).toHaveProperty("payload");
    });

    it("should get a facetNavigation by id", async () => {
        const faceNavigationResponse =
            await facetNavigations.getById(facetNavigationId);

        expect(faceNavigationResponse).toHaveProperty("payload");
        expect(faceNavigationResponse.payload).toHaveProperty("id");

        if (
            faceNavigationResponse?.payload &&
            faceNavigationResponse.payload.id
        ) {
            expect(faceNavigationResponse.payload.id).toEqual(
                facetNavigationId
            );
        }
    });
});
