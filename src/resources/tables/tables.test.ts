import "isomorphic-fetch";
import Tables from "./";
import Projects from "../projects";

import { config } from "../../helpers/testing";
import Client from "../../index";

beforeAll(() => {
    jest.resetModules();
});

describe("Tables Resource", () => {
    const client = new Client(config);
    const tablesResource = client.tables;

    it("should be instance of Tables", () => {
        expect(tablesResource).toBeInstanceOf(Tables);
    });
});
