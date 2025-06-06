import type { ComponentType, Props } from "./types";

/**
 * This method is called during render to determine if the Host Component type and props require some 
 * kind of loading process to complete before committing an update.
 */
export function maySuspendCommit(type: ComponentType, props: Props) {
    return false;
}