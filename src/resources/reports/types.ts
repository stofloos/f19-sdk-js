import { BaseResponse, BlockInterface, Component } from "../../types";

export declare interface Report extends BlockInterface {
    summaryLevel: number;
    name: string;
    urlSegment: string;
    projectId: string;
    language: string;
    components: Array<Component>;
    facetNavigations: null;
    articleIds: Array<string>;
}

export declare interface ReportResponse extends BaseResponse {
    payload: Report | null;
}

export declare interface ReportsResponse extends BaseResponse {
    payload: Array<Report>;
}
