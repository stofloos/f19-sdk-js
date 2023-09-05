import Base from "../base";
import { ProjectResponse, ProjectsResponse } from "./types";

const resource = "project";

export default class Projects extends Base {
    /**
     * Get all projects
     * @returns {Promise<ProjectsResponse>}
     * @example
     * const projects = await client.projects.getAll()
     */
    async getAll(preview = false): Promise<ProjectsResponse> {
        return this.get(`/${resource}`, preview).then(response => {
            return response.json();
        });
    }

    /**
     * Get a project by id
     * @param id
     * @param preview
     * @returns {Promise<ProjectResponse>}
     * @example
     * const project = awaits client.projects.getById("[PROJECT_ID]]")
     */
    async getById(id: string, preview = false): Promise<ProjectResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, preview).then(response => {
            return response.json();
        });
    }
}
