import { BaseResponse } from "../../types";

export declare type Token = {
    "userId": number,
    "thumbprint": string,
    "key": string
}

export declare interface TokenResponse extends BaseResponse {
    payload: Token | null;
}
