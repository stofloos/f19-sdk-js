import "isomorphic-fetch";
import Tokens from "./";
import { config } from "../../helpers/testing";
import Client from "../../types";

describe("Tokens resource", () => {
    const tokensResource = new Client(config).tokens;

    it("should be instance of Tokens", () => {
        expect(tokensResource).toBeInstanceOf(Tokens);
    });
});
