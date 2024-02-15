import { parseString } from "xml2js";

/**
 * Converts XML to JSON.
 * @param xmlString - XML string.
 * @returns Promise<T> - Promise that resolves to a JSON object.
 */
export function xmlToJson<T>(xmlString: string): Promise<T> {
    return new Promise((resolve, reject) => {
        if (!xmlString) {
            reject(new Error("No XML provided"));
        }

        parseString(xmlString, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
