// Generate tests for a websites resource
// Path: src/resources/websites/website.test.ts
// Compare this snippet from src/resources/websites/website.ts:

import Websites from "./website";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

beforeAll(() => {
    jest.resetModules();
});

describe("Websites resource", () => {
    const websites = new Websites({
        apiKey: apiKey,
        baseUrl: baseUrl
    });

    let websiteAlias: string;

    it("should be instance of Websites", () => {
        expect(websites).toBeInstanceOf(Websites);
    });

    it("should get all websites", async () => {
        const websitesResponse = await websites.getAll();

        websiteAlias = websitesResponse?.payload?.[0]?.alias;

        expect(websitesResponse).toEqual(
            expect.objectContaining({
                nextNonce: expect.any(String),
                statusCode: 200,
                errors: null,
                payload: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String),
                        alias: expect.any(String),
                        routes: expect.any(Array)
                    })
                ])
            })
        );
    });

    it("should throw error if alias is not provided", () => {
        expect(() => {
            websites.getByAlias("");
        }).toThrowError("No alias provided");
    });

    it("should get a website by alias", async () => {
        const websiteResponse = await websites.getByAlias(websiteAlias);
        expect(websiteResponse).toEqual(
            expect.objectContaining({
                nextNonce: expect.any(String),
                statusCode: 200,
                errors: null,
                payload: expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    alias: expect.any(String),
                    routes: expect.any(Array)
                })
            })
        );
    });

    // TODO: Fix getCurrent test
    it("throws error getting current website", async () => {
        await expect(websites.getCurrent()).rejects.toThrowError("Not Found");
    });
});
