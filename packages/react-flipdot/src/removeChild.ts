import { BaseNode, Container } from "@owowagency/flipdot-dom";

/**
 * This method should mutate the parentInstance to remove the child from the list of its children.

 * React will only call it for the top-level node that is being removed. 
 * It is expected that garbage collection would take care of the whole subtree. You are not expected to traverse the child tree in it.
 */
export function removeChild(parentInstance: BaseNode, child: BaseNode) {
    if (parentInstance instanceof Container) {
        parentInstance.remove(child);
    }
}