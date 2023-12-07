import Channel from "./";
import "isomorphic-fetch";
import { config } from "../../helpers/testing";
import Client from "../../index";
beforeAll(() => {
    jest.resetModules();
});

describe("Channel Resource", () => {
    const client = new Client(config);
    const channelResource = client.channel;

    it("should be instance of Channel", () => {
        expect(channelResource).toBeInstanceOf(Channel);
    });

    it("should return channel", async () => {
        const channel = await channelResource.getAll();

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
