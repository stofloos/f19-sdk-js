export const config = {
    apiKey: process.env.F19_API_KEY!,
    baseUrl: process.env.F19_BASE_URL!,
    clientId: process.env.CLIENT_ID!,
    //This is the apiKey that is generated in F19 config. Should replace apiKey.
    secretApiKey: process.env.F19_SECRET!
};
