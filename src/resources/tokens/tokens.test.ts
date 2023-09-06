import Tokens from "./";
import { config } from "../../helpers/testing";

describe("Tokens resource", () => {
    const tokensResource = new Tokens(config);

    it("should be instance of Tokens", () => {
        expect(tokensResource).toBeInstanceOf(Tokens);
    });

    it("should contain getPersonal", () => {
        expect(tokensResource).toHaveProperty("getPersonal");
    });

    it("should contain getAnonymous", () => {
        expect(tokensResource).toHaveProperty("getAnonymous");
    });

    it("should contain getThumbprint", () => {
        expect(tokensResource).toHaveProperty("getThumbprint");
    });

    it("should throw an error if authorizationToken  is not provided", async () => {
        await expect(tokensResource.getPersonal("")).rejects.toThrow(
            "Authorization token is required"
        );
    });

    it("should throw an error if userId is not provided", async () => {
        await expect(
            tokensResource.getThumbprint("", "test")
        ).rejects.toThrowError("UserId token is required");
    });

    it("should throw an error if thumbprint is not provided", async () => {
        await expect(
            tokensResource.getThumbprint("test", "")
        ).rejects.toThrowError("Thumbprint token is required");
    });

    // TODO: Fix token tests by providing a valid authorization token.
    it.skip("should get a personal token", async () => {
        const tokenResponse = await tokensResource.getPersonal("test");
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });

    it.skip("should get an anonymous token", async () => {
        const tokenResponse = await tokensResource.getAnonymous();
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });

    it.skip("should get a thumbprint token", async () => {
        const tokenResponse = await tokensResource.getThumbprint(
            "test",
            "test"
        );
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });
});
