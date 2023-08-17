import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: [
        'dotenv/config'
    ],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
