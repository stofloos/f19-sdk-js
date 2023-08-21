import Channel from "./channel";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

beforeAll(() => {
    jest.resetModules();
});

describe("Channel Resource", () => {
    const getChannel = new Channel({
        apiKey: apiKey,
        baseUrl: baseUrl
    });

    it("should be instance of Channel", () => {
        expect(getChannel).toBeInstanceOf(Channel);
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
