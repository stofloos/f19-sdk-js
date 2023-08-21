import Base from "../base";
import { FacetNavigationResponse, FacetNavigationsResponse } from "./types";

export default class FacetNavigations extends Base {
    async getAll(projectId: string): Promise<FacetNavigationsResponse> {

        if(!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        return this.request(`/cms/api/public/v1/facetnavigation/project/${projectId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    async getById(facetId: string): Promise<FacetNavigationResponse> {
        if (!facetId || facetId === "") {
            throw new Error("No facet id provided");
        }

        return this.request(`/cms/api/public/v1/facetnavigation/id/${facetId}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
