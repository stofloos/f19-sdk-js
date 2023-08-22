import { BaseResponse, Block } from "../../types";

export declare type Table = Block;

export declare interface TablesResponse extends BaseResponse {
    payload: Array<Table> | [];
}

export declare interface TableResponse extends BaseResponse {
    payload: Table | null;
}
