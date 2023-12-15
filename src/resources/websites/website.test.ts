import "isomorphic-fetch";
import Websites from "./";
import { config } from "../../helpers/testing";
import Client from "../../types";

beforeAll(() => {
    jest.resetModules();
});

describe("Websites resource", () => {
    const client = new Client(config);
    const websitesResource = client.websites;

    let websiteAlias: string;

    it("should be instance of Websites", () => {
        expect(websitesResource).toBeInstanceOf(Websites);
    });

    it("should get all websites", async () => {
        const websitesResponse = await websitesResource.getAll();

        websiteAlias = websitesResponse?.payload?.[0]?.alias;

        expect(websitesResponse).toHaveProperty("payload");
    });

    it("should throw error if alias is not provided", async () => {
        await expect(websitesResource.getByAlias("")).rejects.toThrowError(
            "No alias provided"
        );
    });

    it("should get a website by alias", async () => {
        const websiteResponse = await websitesResource.getByAlias(websiteAlias);
        expect(websiteResponse).toEqual(
            expect.objectContaining({
                nextNonce: expect.any(String),
                statusCode: 200,
                errors: null,
                payload: expect.objectContaining({
                    id: expect.any(String)
                })
            })
        );
        expect(websiteResponse?.payload).toHaveProperty("alias");
        expect(websiteResponse?.payload?.alias).toEqual(websiteAlias);
    });

    it.skip("throws error getting current website", async () => {
        await expect(websitesResource.getCurrent()).rejects.toThrowError(
            "Not Found"
        );
    });
});
