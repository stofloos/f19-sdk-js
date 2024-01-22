import Base from "../base";
import { BaseResponse, FacetNavigation } from "../../types";

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
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<FacetNavigationsResponse>} A Promise that resolves to a FacetNavigationsResponse.
     */
    async getAll(
        projectId: string,
        options?: RequestInit
    ): Promise<FacetNavigationsResponse> {
        if (!projectId || projectId === "") {
            throw new Error("No project id provided");
        }

        const response = await this.get(
            `/${resource}/project/${projectId}`,
            options || {}
        );
        return await response.json();
    }

    /**
     * Get facet navigation by id
     * @param {string} facetId - The facet ID.
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<FacetNavigationResponse>} A Promise that resolves to a FacetNavigationResponse.
     */
    async getById(
        facetId: string,
        options?: RequestInit
    ): Promise<FacetNavigationResponse> {
        if (!facetId || facetId === "") {
            throw new Error("No facet id provided");
        }

        const response = await this.get(
            `/${resource}/id/${facetId}`,
            options || {}
        );
        return await response.json();
    }
}
