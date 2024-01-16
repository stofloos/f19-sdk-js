import Downloads from "./";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";

beforeAll(() => {
    jest.resetModules();
});

describe("Downloads resource", () => {
    const client = new Client(config);
    const downloadsResource = client.downloads;

    it("should be instance of Projects", () => {
        expect(downloadsResource).toBeInstanceOf(Downloads);
    });
});
