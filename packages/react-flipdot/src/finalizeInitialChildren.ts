import FlipdotDOM, { BaseNode } from "@owowagency/flipdot-dom";
import type { ComponentType, Props } from "./types";

/**
 * In this method, you can perform some final mutations on the instance. 
 * Unlike with createInstance, by the time finalizeInitialChildren is called, 
 * all the initial children have already been added to the instance, 
 * but the instance itself has not yet been connected to the tree on the screen.
 *
 * This method happens in the render phase. 
 * It can mutate instance, but it must not modify any other nodes. 
 * It's called while the tree is still being built up and not connected to the actual tree on the screen.
 *
 * There is a second purpose to this method. 
 * It lets you specify whether there is some work that needs to happen when the node is connected to the tree on the screen. 
 * If you return true, the instance will receive a commitMount call later. 
 * See its documentation below.
 * 
 * If you don't want to do anything here, you should return false.
 */
export function finalizeInitialChildren(instance: BaseNode, type: ComponentType, props: Props, rootContainer: FlipdotDOM) {
    return false;
}