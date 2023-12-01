import Base from "../base";
import { BaseResponse } from "../../index";

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

const resource = "project";

export default class Projects extends Base {
    /**
     * Get all projects
     * @async
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<ProjectsResponse>}
     * @example
     * const projects = await client.projects.getAll()
     */
    async getAll(
        token?: string,
        options: RequestInit = {}
    ): Promise<ProjectsResponse> {
        const response = await this.get(`/${resource}`, token, options);
        const json = await response.json();
        return json;
    }

    /**
     * Get a project by id
     * @param id
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @returns {Promise<ProjectResponse>}
     * @example
     * const project = awaits client.projects.getById("[PROJECT_ID]]")
     */
    async getById(
        id: string,
        options: RequestInit = {},
        token?: string
    ): Promise<ProjectResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, token, options).then(
            response => {
                return response.json();
            }
        );
    }
}
