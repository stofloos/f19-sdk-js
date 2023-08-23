import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    transform: {
        "^.+\\.ts?$": ["ts-jest", { tsconfig: "tsconfig.esm.json" }]
    },
    setupFiles: ["dotenv/config"],
    testEnvironment: "node",
    modulePathIgnorePatterns: ["<rootDir>/dist/"]
};

export default config;
