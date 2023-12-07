import Assets from "./";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";

describe("Asset Resource", () => {
    const client = new Client(config);
    const assets = client.assets;

    it("should be instance of Assets", () => {
        expect(assets).toBeInstanceOf(Assets);
    });
});
