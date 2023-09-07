import Base from "./base";

class TestBase extends Base {}

describe("Base Instance", () => {
    it("should throw error if api key is not configured", () => {
        expect(() => {
            new TestBase({
                apiKey: "",
                baseUrl: "https://api.f19.rocks"
            });
        }).toThrowError("Api key not configured");
    });

    it("should throw error if base url is not configured", () => {
        expect(() => {
            new TestBase({
                apiKey: "123",
                baseUrl: ""
            });
        }).toThrowError("Base URL not configured");
    });

    it("should throw error if endpoint is not configured", async () => {
        const base = new TestBase({
            apiKey: "123",
            baseUrl: "https://api.f19.rocks"
        });

        await expect(base.get("")).rejects.toThrowError("Endpoint not found");
    });

    it("should throw error if endpoint is not configured", async () => {
        const base = new TestBase({
            apiKey: "123",
            baseUrl: "https://api.f19.rocks"
        });

        await expect(base.post("", {})).rejects.toThrowError(
            "Endpoint not found"
        );
    });
});
