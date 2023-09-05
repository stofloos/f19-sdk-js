import "isomorphic-fetch";
import Nonce from "./";
import { config } from "../../helpers/testing";

describe("Nonce resource", () => {
    const nonceResource = new Nonce(config);

    it("should generate a nonce", async () => {
        const nonce = await nonceResource.getNonce();
        expect(nonce).toHaveProperty("payload");
        expect(nonce.payload).toEqual(expect.any(String));
    });
});
