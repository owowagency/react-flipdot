import { BaseNode } from "@owowagency/flipdot-dom";

/**
 * This method should make the instance visible, undoing what hideInstance did.
 */
export function unhideInstance(instance: BaseNode) {
    instance.unhide();
}