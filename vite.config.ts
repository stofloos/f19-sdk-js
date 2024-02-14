import dts from "vite-plugin-dts";
import { defineConfig, UserConfig } from "vite";
import * as path from "path";

export default defineConfig({
    base: "./",
    plugins: [dts({ rollupTypes: true, bundledPackages: ["jose", "xml2js"] })],
    build: {
        ssr: true,
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "f19-sdk-js",
            formats: ["es", "umd"]
        },
        target: "esnext", // transpile as little as possible
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["jose", "xml2js"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    jose: "jose",
                    xml2js: "xml2js"
                }
            }
        }
    }
} satisfies UserConfig);
