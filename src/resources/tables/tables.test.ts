import "isomorphic-fetch";
import Tables from "./";
import Projects from "../projects";

import { config } from "../../helpers/testing";

describe("Tables Resource", () => {
    const tablesResource = new Tables(config);
    let tableId: string;

    it("should be instance of Tables", () => {
        expect(tablesResource).toBeInstanceOf(Tables);
    });

    it("should throw error if projectId is not provided", async () => {
        await expect(tablesResource.getAll("")).rejects.toThrowError(
            "No project id provided"
        );
    });

    it("should get all tables", async () => {
        const projectsResource = new Projects(config);
        const projectsResponse = await projectsResource.getAll();

        const projectId = projectsResponse?.payload?.[0]?.id;
        const tablesResponse = await tablesResource.getAll(projectId);

        tableId =
            tablesResponse?.payload?.[0] && tablesResponse?.payload?.[0]?.id;

        expect(tablesResponse).toHaveProperty("payload");
        expect(tablesResponse.payload).toBeInstanceOf(Array);
    });

    it("should get a table by id", async () => {
        const tableResponse = await tablesResource.getById(tableId);

        expect(tableResponse).toHaveProperty("payload");
        expect(tableResponse.payload).toBeInstanceOf(Object);
        expect(tableResponse.payload).toHaveProperty("id");

        if (tableResponse?.payload && tableResponse.payload.id) {
            expect(tableResponse.payload.id).toEqual(tableId);
        }
    });
});
