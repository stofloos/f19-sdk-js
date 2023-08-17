import { Base } from "../base";
import { ProjectResponse, ProjectsResponse } from "./types";

export class Projects extends Base {
    getById(id: string): Promise<ProjectResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.request(`/cms/api/public/v1/project/id/${id}`, {
            method: "GET"
        });
    }

    getAll(): Promise<ProjectsResponse> {
        return this.request(`/cms/api/public/v1/project`, { method: "GET" });
    }
}
