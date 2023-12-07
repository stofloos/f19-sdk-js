import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";

describe("Nonce resource", () => {
    const nonceResource = new Client(config).nonce;

    it("should generate a nonce", async () => {
        const nonce = await nonceResource.getNonce();
        expect(nonce).toHaveProperty("payload");
        expect(nonce.payload).toEqual(expect.any(String));
    });
});
