import Client from "./index";
import "isomorphic-fetch"

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;


const client = new Client({
    apiKey: apiKey,
    baseUrl: baseUrl

});

describe("Index", () => {
    it("should be instance of Client", () => {
        expect(client).toBeInstanceOf(Client);
    });

    it("should throw error if api key is not configured", () => {
        expect(() => {
            new Client({
                apiKey: "",
                baseUrl: "https://api.f19.rocks"
            });
        }).toThrowError("Api key not configured");

    })

    it("should throw error if base url is not configured", () => {
        expect(() => {
            new Client({
                apiKey: "123",
                baseUrl: ""
            });
        }).toThrowError("Base url not configured");
    })

    it("should contain projects", () => {
        expect(client).toHaveProperty("projects");
    })

    it("should be able to run projects.getAll()", async () => {
      await expect(client.projects.getAll()).resolves.toHaveProperty("payload");
    })

    it("should be able to run projects.getById()", async () => {
        await expect(client.projects.getById("f9f9e70a-03e8-0000-f884-fdaf7d6313ed")).resolves.toHaveProperty("payload");
    })


});
