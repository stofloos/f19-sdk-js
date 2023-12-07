import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";
import Nonce from "./index";

describe("Nonce resource", () => {
    const nonceResource = new Client(config).nonce;

    it("should be a nonce", async () => {
        expect(nonceResource).toBeInstanceOf(Nonce);
    });
});
