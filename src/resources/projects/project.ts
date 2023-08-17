import { Base } from "../base";
import { ProjectResponse, ProjectsResponse } from "./types";

export class Projects extends Base {

    /**
     * Get a project by id
     * @param id
     * @returns {Promise<ProjectResponse>}
     */
    getById(id: string): Promise<ProjectResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/project/id/${id}`, {
            method: "GET"
        });
    }

    /**
     * Get all projects
     * @returns {Promise<ProjectsResponse>}
     */
    getAll(): Promise<ProjectsResponse> {
        return this.request(`/cms/api/public/v1/project`, { method: "GET" });
    }
}
