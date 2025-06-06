import { Text } from "@owowagency/flipdot-dom";

/**
 * Same as unhideInstance, but for nodes created by createTextInstance.
 */
export function unhideTextInstance(instance: Text) {
    instance.unhide();
}