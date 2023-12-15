import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../types";
import Images from "./";

describe("Images resource", () => {
    const client = new Client(config);
    const imagesResource = client.images;

    it("should be instance of Images", () => {
        expect(imagesResource).toBeInstanceOf(Images);
    });
});
