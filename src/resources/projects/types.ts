import { BaseResponse } from "../../types";

export declare type Project = {
    id: string;
    name: string;
    language: string;
    publishDate: string;
};

export declare interface ProjectResponse extends BaseResponse {
    payload: Project | null;
}

export declare interface ProjectsResponse extends BaseResponse {
    payload: Array<Project>;
}
