import FlipdotDOM, { BaseNode } from "@owowagency/flipdot-dom";

/**
 * Same as appendChild, but for when a node is attached to the root container. 
 * This is useful if attaching to the root has a slightly different implementation, 
 * or if the root container nodes are of a different type than the rest of the tree.
 */
export function appendChildToContainer(container: FlipdotDOM, child: BaseNode) {
    container.append(child);
}