import Base from "../base";
import { BaseResponse } from "../../index";

export declare type Facet = {
    id: string;
    name: string;
    urlSegment: string;
    facets: Array<Facet>;
};

export declare type FacetNavigation = {
    id: string;
    projectId: string;
    name: string;
    facets: Array<Facet>;
    securedProjectId: number;
};

export declare interface FacetNavigationsResponse extends BaseResponse {
    payload: Array<FacetNavigation>;
}

export declare interface FacetNavigationResponse extends BaseResponse {
    payload: FacetNavigation | null;
}

const resource = "facetnavigation";

export default class FacetNavigations extends Base {
    /**
     * Get all facet navigations by project id
     * @param {string} projectId - The project ID.
     * @returns {Promise<FacetNavigationsResponse>} A Promise that resolves to a FacetNavigationsResponse.
     */
    async getAll(projectId: string): Promise<FacetNavigationsResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        const response = await this.get(`/${resource}/project/${projectId}`);
        const json = await response.json();
        return json;
    }

    /**
     * Get facet navigation by id
     * @param {string} facetId - The facet ID.
     * @returns {Promise<FacetNavigationResponse>} A Promise that resolves to a FacetNavigationResponse.
     */
    async getById(facetId: string): Promise<FacetNavigationResponse> {
        if (!facetId || facetId === "") {
            throw new Error("No facet id provided");
        }

        const response = await this.get(`/${resource}/id/${facetId}`);
        const json = await response.json();
        return json;
    }
}
