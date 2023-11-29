import { xmlToJson } from "./xml";

describe("XML helpers", () => {
    describe("Convert XML to JSON", () => {
        it("should convert XML to JSON", async () => {
            const xml = `<root><test>test</test></root>`;
            const jsonExpectedResult = { root: { test: "test" } };
            const json = xmlToJson(xml);

            expect(json).toBeTruthy();
            expect(json).toEqual(jsonExpectedResult);
        });
    });
});
