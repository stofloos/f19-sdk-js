import "isomorphic-fetch"
import Nonce from "./index";
import { Config } from "../../types";

const config: Config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!
};


describe("Nonce resource", () => {
    const nonceResource = new Nonce(config);

    it("should generate a nonce", async () => {
        const nonce = await nonceResource.getNonce();
        expect(nonce).toHaveProperty("payload");
        expect(nonce.payload).toEqual(expect.any(String));
    });
})
