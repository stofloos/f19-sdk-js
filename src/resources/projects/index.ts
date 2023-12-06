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
     * @returns {Promise<ProjectsResponse>} A Promise that resolves to a ProjectsResponse.
     * @example
     * const projects = await client.projects.getAll()
     */
    async getAll(): Promise<ProjectsResponse> {
        const response = await this.get(`/${resource}`);
        const json = await response.json();
        return json;
    }

    /**
     * Get a project by id
     * @param {string} id - The project ID.
     * @returns {Promise<ProjectResponse>} A Promise that resolves to a ProjectResponse.
     * @example
     * const project = await client.projects.getById("[PROJECT_ID]")
     */
    async getById(id: string): Promise<ProjectResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }
        const response = await this.get(`/${resource}/id/${id}`);
        const json = await response.json();
        return json;
    }
}
