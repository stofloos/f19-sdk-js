import Index from "./";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";
beforeAll(() => {
    jest.resetModules();
});

describe("Channel Resource", () => {
    const getChannel = new Index(config);

    it("should be instance of Channel", () => {
        expect(getChannel).toBeInstanceOf(Index);
    });

    it("should return channel", async () => {
        const channel = await getChannel.getAll();

        expect(channel).toEqual(
            expect.objectContaining({
                nextNonce: expect.any(String),
                errors: null,
                payload: expect.arrayContaining([
                    expect.objectContaining({
                        alias: expect.any(String),
                        name: expect.any(String),
                        outputStandard: expect.any(String)
                    })
                ]),
                statusCode: 200
            })
        );
    });
});
