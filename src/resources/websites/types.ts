
export declare type Event =  {
    "message": string,
    "type": string,
    "category": string,
    "level": number,
    "tags": {
        "type": string,
        "key": string,
        "project-alias": string,
        "project-id": string
    },
    "channels": null
}

export declare type ChannelTag =   {
    "channel": string,
    "tags": {
        "content": {
            "url_internal": {
                "value": string,
                "type":string,
                "project-id":string,
                "label": string,
                "title": string,
                "target":  string |null,
                "anchor": string |null
            }
        },
        "settings": {
            "page_layout_wide": string
        },
        "editclass":string
    }
}

export declare type Block = {
    "type": string,
    "id": string,
    "blocks": Array<Block> |[],
    "multiChannelResources": [],
    "multiChannelTags": Array<ChannelTag>,
    "text": null,
    "events": Array<Event>,
}


export declare type Route =  {
    "id": string,
    "parentId": string | null,
    "name": string,
    "urlSegment": string,
    "sortOrder": number,
    "url": string,
    "block": Block |null,
}


export declare type Website = {
    "id": string,
    "name": string,
    "alias": string,
    "routes": Array<Route> | []
}


export declare type WebsitesResponse = {
    "nextNonce": string,
    "statusCode": number,
    "errors": null,
    "payload": Array<Website>
}

export declare type WebsiteResponse = {
    "nextNonce": string,
    "statusCode": number,
    "errors": null,
    "payload": Website | null
}
