import Base from "../base";
import { FacetNavigationResponse, FacetNavigationsResponse } from "./types";
const resource = "facetnavigation";
export default class FacetNavigations extends Base {
    /**
     * @method getAll
     * @param projectId
     * @param preview
     */
    async getAll(
        projectId: string,
        preview = false
    ): Promise<FacetNavigationsResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        return this.get(`/${resource}/project/${projectId}`, preview).then(
            response => {
                return response.json();
            }
        );
    }

    /**
     * @method getById
     * @param facetId
     * @param preview
     */
    async getById(
        facetId: string,
        preview = false
    ): Promise<FacetNavigationResponse> {
        if (!facetId || facetId === "") {
            throw new Error("No facet id provided");
        }

        return this.get(`/${resource}/id/${facetId}`, preview).then(
            response => {
                return response.json();
            }
        );
    }
}
