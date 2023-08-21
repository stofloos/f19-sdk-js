export declare type Project = {
    id: string;
    name: string;
    language: string;
    publishDate: string;
};

export declare type ProjectResponse = {
    errors: null;
    payload: Project;
    statusCode: number;
};

export declare type ProjectsResponse = {
    errors: null;
    payload: Array<Project> | [];
    statusCode: number;
};
