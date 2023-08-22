import { BaseResponse } from "../../types";

export declare type Project = {
    id: string;
    name: string;
    language: string;
    publishDate: string;
};

export declare interface ProjectResponse extends BaseResponse {
    errors: null;
    payload: Project;
    statusCode: number;
};

export declare interface ProjectsResponse  extends BaseResponse {
    errors: null;
    payload: Array<Project> | [];
    statusCode: number;
};
