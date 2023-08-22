import { BaseResponse } from "../../types";

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
    payload: Array<FacetNavigation> | [];
}

export declare interface FacetNavigationResponse extends BaseResponse {
    payload: FacetNavigation | null;
}
