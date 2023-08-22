import Tokens from "./";
import { Config } from "../../types";

const config: Config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};

describe("Tokens resource", () => {
    const tokensResource = new Tokens(config);

    it("should be instance of Tokens", () => {
        expect(tokensResource).toBeInstanceOf(Tokens);
    });

    it("should throw an error if authorizationToken  is not provided", async () => {
        await expect(tokensResource.getPersonal("")).rejects.toThrow(
            "Authorization token is required"
        );
        await expect(tokensResource.getAnonymous("")).rejects.toThrow(
            "Authorization token is required"
        );
        await expect(tokensResource.getThumbprint("")).rejects.toThrow(
            "Authorization token is required"
        );
    });


    // TODO: Fix token tests by providing a valid authorization token.
    it.skip("should get a personal token", async () => {
        const tokenResponse = await tokensResource.getPersonal("test");
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });

    it.skip("should get an anonymous token", async () => {
        const tokenResponse = await tokensResource.getAnonymous("test");
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });

    it.skip("should get a thumbprint token", async () => {
        const tokenResponse = await tokensResource.getThumbprint("test");
        expect(tokenResponse).toHaveProperty("payload");
        expect(tokenResponse.payload).toHaveProperty("token");
    });
});
