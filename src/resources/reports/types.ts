import {
    BaseResponse,
    BlockInterface,
    Cover,
    Heading,
    SlipSheet,
    TableOfContents
} from "../../types";
import { Article } from "../articles/types";

export enum ReportChannel {
    WEBSITE = "chwebsite",
    TABLET = "chtablet",
    PHONE = "chphone",
    PDF = "chpdf",
    ALL = "*"
}

export declare type ReportComponent =
    | Cover
    | Article
    | SlipSheet
    | Heading
    | TableOfContents;

export declare interface Report extends BlockInterface {
    summaryLevel: number;
    name: string;
    urlSegment: string;
    projectId: string;
    language: string;
    components: Array<ReportComponent>;
    facetNavigations: null;
    articleIds: Array<string>;
}

export declare interface ReportResponse extends BaseResponse {
    payload: Report | null;
}

export declare interface ReportsResponse extends BaseResponse {
    payload: Array<Report>;
}
