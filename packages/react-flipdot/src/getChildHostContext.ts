import FlipdotDOM from "@owowagency/flipdot-dom";
import type { ChildHostContext, ComponentType, RootHostContext } from "./types";

/**
 * Host context lets you track some information about where you are in the tree so that it's available inside createInstance as the hostContext parameter. 
 * For example, the DOM renderer uses it to track whether it's inside an HTML or an SVG tree, 
 * because createInstance implementation needs to be different for them.
 * 
 * If the node of this type does not influence the context you want to pass down, you can return parentHostContext. 
 * Alternatively, you can return any custom object representing the information you want to pass down.
 * 
 * If you don't want to do anything here, return parentHostContext.
 * 
 * This method happens in the render phase. Do not mutate the tree from it.
 */
export function getChildHostContext(parentHostContext: RootHostContext, type: ComponentType, rootContainer: FlipdotDOM): ChildHostContext {
    return parentHostContext;
}