import { BaseNode } from "@owowagency/flipdot-dom";

/**
 * This method should make the instance invisible without removing it from the tree. 
 * For example, it can apply visual styling to hide it. 
 * It is used by Suspense to hide the tree while the fallback is visible.
 */
export function hideInstance(instance: BaseNode) {
    instance.hide();
}