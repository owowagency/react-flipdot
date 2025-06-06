/**
 * This method is only called if you returned true from finalizeInitialChildren for this instance.
 * 
 * It lets you do some additional work after the node is actually attached to the tree on the screen for the first time. 
 * For example, the DOM renderer uses it to trigger focus on nodes with the autoFocus attribute.
 * 
 * Note that commitMount does not mirror removeChild one to one because removeChild is only called for the top-level removed node. 
 * This is why ideally commitMount should not mutate any nodes other than the instance itself. 
 * For example, if it registers some events on some node above, 
 * it will be your responsibility to traverse the tree in removeChild and clean them up, which is not ideal.
 * 
 * The internalHandle data structure is meant to be opaque. 
 * If you bend the rules and rely on its internal fields, be aware that it may change significantly between versions. 
 * You're taking on additional maintenance risk by reading from it, and giving up all guarantees if you write something to it.
 * 
 * If you never return true from finalizeInitialChildren, you can leave it empty.
 */
export function commitMount(instance, type, props, internalHandle) {
    
}