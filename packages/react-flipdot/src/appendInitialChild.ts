import { BaseNode, Container } from "@owowagency/flipdot-dom"

/**
 * This method should mutate the parentInstance and add the child to its list of children. 
 * For example, in the DOM this would translate to a parentInstance.appendChild(child) call.
 *
 * This method happens in the render phase. 
 * It can mutate parentInstance and child, but it must not modify any other nodes. 
 * It's called while the tree is still being built up and not connected to the actual tree on the screen.
 */
export function appendInitialChild(parentInstance: BaseNode, child: BaseNode) {
    if (parentInstance instanceof Container) {
        parentInstance.append(child);
    }
}