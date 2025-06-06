import { Text } from "@owowagency/flipdot-dom";

/**
 * Same as hideInstance, but for nodes created by createTextInstance.
 */
export function hideTextInstance(instance: Text) {
    instance.hide();
}