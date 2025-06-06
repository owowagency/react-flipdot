import FlipdotDOM, {Text} from "@owowagency/flipdot-dom";
import type { ComponentType, Props } from "./types";

/**
 * This method should return a newly created node. For example, 
 * the DOM renderer would call document.createElement(type) here and then set the properties from props.
 * 
 * You can use rootContainer to access the root container associated with that tree. 
 * For example, in the DOM renderer, this is useful to get the correct document reference that the root belongs to.
 * The hostContext parameter lets you keep track of some information about your current place in the tree. 
 * To learn more about it, see getChildHostContext below.
 * 
 * The internalHandle data structure is meant to be opaque. 
 * If you bend the rules and rely on its internal fields, be aware that it may change significantly between versions. 
 * You're taking on additional maintenance risk by reading from it, and giving up all guarantees if you write something to it.
 * 
 * This method happens in the render phase. 
 * It can (and usually should) mutate the node it has just created before returning it, but it must not modify any other nodes. 
 * It must not register any event handlers on the parent tree. 
 * This is because an instance being created doesn't guarantee it would be placed in the tree — it could be left unused and later collected by GC. 
 * If you need to do something when an instance is definitely in the tree, look at commitMount instead.
 */
export function createInstance(type: ComponentType, props: Props, rootContainer: FlipdotDOM) {
    const element = rootContainer.createElement(type);
    element.apply(props.style || {});
    if (element instanceof Text) {
        if (Array.isArray(props.children)) {
            element.setText(props.children.join(''))
        } else if (props.children === undefined || props.children === null) {
            element.setText('');
        } else {
            element.setText(String(props.children));
        }
    }
    return element;
}