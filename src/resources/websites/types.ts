import { BaseResponse, Block } from "../../types";

export declare type Route = {
    id: string;
    parentId: string | null;
    name: string;
    urlSegment: string;
    sortOrder: number;
    url: string;
    block: Block | null;
};

export declare type Website = {
    id: string;
    name: string;
    alias: string;
    routes: Array<Route> | [];
};

export declare interface WebsitesResponse extends BaseResponse {
    nextNonce: string;
    statusCode: number;
    errors: null;
    payload: Array<Website>;
}

export declare interface WebsiteResponse extends BaseResponse {
    nextNonce: string;
    statusCode: number;
    errors: null;
    payload: Website | null;
}
