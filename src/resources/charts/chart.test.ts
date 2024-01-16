import Charts from "./";
import "isomorphic-fetch";

import { config } from "../../helpers/testing";
import Client from "../../index";

describe("Charts resource", () => {
    const client = new Client(config);
    const chartsResource = client.charts;

    it("should be instance of Charts", () => {
        expect(chartsResource).toBeInstanceOf(Charts);
    });
});
