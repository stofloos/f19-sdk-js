import { generateClientToken, generateRequestToken } from "./jwt";
import { config } from "./testing";
import Client from "../index";

describe("JWT Helpers", () => {
    const client = new Client(config);
    const jwtSecret = config.secret;
    const claims = {
        ClientId: config.clientId
    };

    describe("Generate Signed JWT token", () => {
        it("should throw error if secret is not configured", async () => {
            await expect(generateClientToken(claims, "")).rejects.toThrowError(
                "JWT secret not configured"
            );
        });

        it("should throw error if payload is not provided", async () => {
            await expect(
                generateClientToken(null, jwtSecret)
            ).rejects.toThrowError("Payload not provided");
        });

        it("should return a valid Anonymous token", async () => {
            const clientToken = await generateClientToken(claims, jwtSecret);
            const tokenResponse = await client.tokens.getAnonymousToken({
                headers: {
                    "X-F19-ClientToken": clientToken
                }
            });

            const token = await tokenResponse.json();

            expect(token.payload).toBeTruthy();
        });
    });

    describe("Generate Request token", () => {
        it("should return a valid Request token", async () => {
            const ClientToken = await generateClientToken(claims, jwtSecret);

            const tokenResponse = await client.tokens.getAnonymousToken({
                headers: {
                    "X-F19-ClientToken": ClientToken
                }
            });

            const token = await tokenResponse.json();

            const requestToken = await generateRequestToken({
                sessionKey: token.payload,
                uri: "https://demo.cfreports.f19.nl/cms/api/public/v1/project",
                clientId: config.clientId,
                method: "GET"
            });

            const projectResponse = await client.projects.getAll(requestToken);

            expect(projectResponse).toBeTruthy();
        });
    });
});
