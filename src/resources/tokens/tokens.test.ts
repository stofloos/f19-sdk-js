import "isomorphic-fetch";
import Tokens from "./";
import { config } from "../../helpers/testing";

describe("Tokens resource", () => {
    const tokenResource = new Tokens(config);

    it("should be instance of Tokens", () => {
        expect(tokenResource).toBeInstanceOf(Tokens);
    });

    it("should contain getPersonal", () => {
        expect(tokenResource).toHaveProperty("getPersonal");
    });

    it("should contain getAnonymous", () => {
        expect(tokenResource).toHaveProperty("getAnonymous");
    });

    it("should contain getThumbprint", () => {
        expect(tokenResource).toHaveProperty("getThumbprint");
    });

    it("should throw an error if authorizationToken  is not provided", async () => {
        await expect(tokenResource.getPersonalToken("")).rejects.toThrow(
            "Authorization token is required"
        );
    });

    it("should throw an error if userId is not provided", async () => {
        await expect(
            tokenResource.getThumbprint("", "test")
        ).rejects.toThrowError("UserId token is required");
    });

    it("should throw an error if thumbprint is not provided", async () => {
        await expect(
            tokenResource.getThumbprint("test", "")
        ).rejects.toThrowError("Thumbprint token is required");
    });

    // TODO: Fix token tests by providing a valid authorization token.
    it.skip("should get a personal token", async () => {
        const tokenResponse = await tokenResource.getPersonalToken("test");
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });

    it.skip("should get an anonymous token", async () => {
        const tokenResponse = await tokenResource.getAnonymousToken();
        expect(tokenResponse).toHaveProperty("payload");

        const token = await tokenResponse.json();
        expect(token).toHaveProperty("token");
    });

    it.skip("should get a thumbprint token", async () => {
        const tokenResponse = await tokenResource.getThumbprint("test", "test");
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });
});
