import * as jose from "jose";
import { xmlToJson } from "./xml";
import { Token } from "../types";

type RSAKeyData = {
    RSAKeyValue: {
        Modulus: string;
        Exponent: string;
        D: string;
        P: string;
        Q: string;
        DP: string;
        DQ: string;
        InverseQ: string;
    };
};

type Claims = {
    KeyId?: string;
    UserId?: number;
    ClientId: string;
    Uri?: string;
    Method?: string;
};

function transformRSAKeyData(key: RSAKeyData) {
    if (!key || !key.RSAKeyValue) {
        throw new Error("Invalid RSA key data");
    }

    const data = key?.RSAKeyValue;

    return {
        kty: "RSA",
        n: data?.Modulus,
        e: data?.Exponent,
        d: data?.D,
        p: data?.P,
        dp: data?.DP,
        dq: data?.DQ,
        q: data?.Q,
        qi: data?.InverseQ
    };
}

/**
 * Generate a JWT token
 * @param claims - Claims to be included in the JWT
 * @param secret - Secret used to sign the JWT
 * @returns A signed JWT
 */
export async function generateClientToken(
    claims: Claims | null,
    secret: string
): Promise<string> {
    // Throw error if claims or secret is not provided
    if (!claims) {
        throw new Error("Payload not provided");
    }

    if (!secret || secret === "") {
        throw new Error("JWT secret not configured");
    }

    // Algorithm and type
    const alg = "HS256";
    const typ = "JWT";

    // Encode secret as UTF-8
    const encodedSecret = new TextEncoder().encode(secret);
    const signJWT = new jose.SignJWT(claims);
    // Generate JWT
    return await signJWT
        .setProtectedHeader({ alg, typ })
        .setIssuedAt()
        .sign(encodedSecret);
}

/**
 * Generate a request token
 * @param sessionKey - Session key
 * @param uri - URI
 * @param clientId - Client ID
 * @param method {RequestInit["method"]} - HTTP method
 * @param expiresAt {string|number|Date}  - Expiration time for the JWT
 */
export async function generateRequestToken({
    sessionKey,
    uri,
    clientId,
    method,
    expiresAt
}: {
    sessionKey: Token;
    uri: string;
    clientId: string;
    method: RequestInit["method"];
    expiresAt: string | number | Date;
}): Promise<string> {
    const alg = "RS256";

    // Parse RSA key data from XML to JSON
    const RSAKeyData = await xmlToJson<RSAKeyData>(sessionKey.key);

    // Transform RSA key data to JOSE format
    const parsedRSAKey = transformRSAKeyData(RSAKeyData);

    // Import RSA key data
    const privateKey = await jose.importJWK(parsedRSAKey);

    // Claims to be included in the JWT
    const claims: Claims = {
        KeyId: sessionKey.thumbprint,
        UserId: sessionKey.userId,
        ClientId: clientId,
        Uri: uri,
        Method: method
    };

    // Generate JWT
    return new jose.SignJWT(claims)
        .setProtectedHeader({ alg, typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(privateKey);
}
