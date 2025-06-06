import FlipdotDOM, { BaseNode } from "@owowagency/flipdot-dom";

/**
 * Same as removeChild, but for when a node is detached from the root container. 
 * This is useful if attaching to the root has a slightly different implementation, 
 * or if the root container nodes are of a different type than the rest of the tree.
 */
export function removeChildFromContainer(container: FlipdotDOM, child: BaseNode) {
    container.remove(child);
}