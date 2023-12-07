import Reports from "./";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";

describe("Reports resource", () => {
    const client = new Client(config);
    const reports = client.reports;

    it("should be instance of Reports", () => {
        expect(reports).toBeInstanceOf(Reports);
    });
});
