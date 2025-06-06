import FlipdotDOM from "@owowagency/flipdot-dom";
import type { RootHostContext } from "./types";

/**
 * This method lets you return the initial host context from the root of the tree. 
 * See getChildHostContext for the explanation of host context.
 * 
 * If you don't intend to use host context, you can return null.
 * 
 * This method happens in the render phase. Do not mutate the tree from it.
 */
export function getRootHostContext(rootContainer: FlipdotDOM): RootHostContext {
    return {};
}