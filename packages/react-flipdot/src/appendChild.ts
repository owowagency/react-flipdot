import { BaseNode, Container } from "@owowagency/flipdot-dom";

/**
 * This method should mutate the parentInstance and add the child to its list of children. 
 * For example, in the DOM this would translate to a parentInstance.appendChild(child) call.
 *
 * Although this method currently runs in the commit phase, you still should not mutate any other nodes in it. 
 * If you need to do some additional work when a node is definitely connected to the visible tree, look at commitMount.
 */
export function appendChild(parentInstance: BaseNode, child: BaseNode) {
    if (parentInstance instanceof Container) {
        parentInstance.append(child);
    }
}