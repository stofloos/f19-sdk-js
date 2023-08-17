import type { Config } from "../index";

export abstract class Base {
    readonly apiKey: string;
    readonly baseUrl: string;

    constructor({ apiKey, baseUrl }: Config) {
        if (!apiKey || apiKey === "") {
            throw new Error("Api key not configured");
        }

        if (!baseUrl || baseUrl === "") {
            throw new Error("Base URL not configured");
        }

        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }

        const headers = {
            "Content-Type": "application/json",
            "X-API-Key": this.apiKey,
            "Orgin": this.baseUrl
        };

        const response = await fetch(url, {
            ...options,
            headers,
            mode: "no-cors"
        });

        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }
}
