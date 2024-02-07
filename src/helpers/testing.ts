import { Config, ConfigInput } from "../";

export const config: ConfigInput = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!,
    clientId: process.env.F19_CLIENT_ID!,
    cacheExpiration: 3600 * 1000
};
