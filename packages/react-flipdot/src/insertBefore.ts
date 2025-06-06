import { BaseNode, Container } from "@owowagency/flipdot-dom";

/**
 * This method should mutate the parentInstance and place the child before beforeChild in the list of its children. 
 * For example, in the DOM this would translate to a parentInstance.insertBefore(child, beforeChild) call.
 * 
 * Note that React uses this method both for insertions and for reordering nodes. 
 * Similar to DOM, it is expected that you can call insertBefore to reposition an existing child. 
 * Do not mutate any other parts of the tree from it.
 */
export function insertBefore(parentInstance: BaseNode, child: BaseNode, beforeChild: BaseNode) {
    if (parentInstance instanceof Container) {
        parentInstance.appendBefore(child, beforeChild)
    }
}