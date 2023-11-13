import { Component } from "../index";

type filterComponentsByChannelParams = {
    components: Array<Component>;
    channel: string;
    whitelist?: Array<string>;
};

export function filterComponentsByChannel({
    components,
    channel,
    whitelist = ["cover"]
}: filterComponentsByChannelParams) {
    return components?.filter((component: Component) => {
        // Get tags for the current channel
        const channelTags = component?.multiChannelTags?.find(
            tag => tag.channel === channel
        );

        // If the component is a cover,
        // it should always be visible
        if (whitelist.includes(component.type)) {
            return true;
        }

        // Check if visible tag is not false
        return channelTags?.tags?.["is-visible"] !== false;
    });
}
