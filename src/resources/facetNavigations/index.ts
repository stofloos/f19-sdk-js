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
     * @method getAll
     * @param projectId
     * @param preview
     */
    async getAll(
        projectId: string,
        preview: boolean = false
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
        preview: boolean = false
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
