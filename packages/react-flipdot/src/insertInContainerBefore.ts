import FlipdotDOM, { BaseNode } from "@owowagency/flipdot-dom";

/**
 * Same as insertBefore, but for when a node is attached to the root container. 
 * This is useful if attaching to the root has a slightly different implementation, 
 * or if the root container nodes are of a different type than the rest of the tree.
 */
export function insertInContainerBefore(container: FlipdotDOM, child: BaseNode, beforeChild: BaseNode) {
    container.appendBefore(child, beforeChild);
}