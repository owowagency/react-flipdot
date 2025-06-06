import { BaseNode, Text } from "@owowagency/flipdot-dom";
import type { ComponentType, Props } from "./types";

/**
 * This method should mutate the instance to match nextProps.
 * 
 * The internalHandle data structure is meant to be opaque. 
 * If you bend the rules and rely on its internal fields, be aware that it may change significantly between versions. 
 * You're taking on additional maintenance risk by reading from it, and giving up all guarantees if you write something to it.
 */
export function commitUpdate(instance: BaseNode, type: ComponentType, prevProps: Props, nextProps: Props, internalHandle) {
    instance.apply(nextProps.style || {});
    if (instance instanceof Text) {
        if (Array.isArray(nextProps.children)) {
            instance.setText(nextProps.children.join(''))
        } else if (nextProps.children === undefined || nextProps.children === null) {
            instance.setText('');
        } else {
            instance.setText(String(nextProps.children));
        }
    }
}