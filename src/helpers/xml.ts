import { toJson } from "xml2json";

/**
 * Converts XML to JSON
 * @param xmlString{} - XML string
 * @returns object  - JSON object
 */
export function xmlToJson<T>(xmlString: string): T {
    if (!xmlString) {
        throw new Error("No XML provided");
    }

    if (typeof xmlString !== "string") {
        throw new Error("XML must be a string");
    }

    return JSON.parse(toJson(xmlString));
}
