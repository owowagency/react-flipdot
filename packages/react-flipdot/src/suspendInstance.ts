import type { ComponentType, Props } from "./types";

/**
 * This method is called after startSuspendingCommit for each Host Component that indicated it might suspend a commit.
 */
export function suspendInstance(type: ComponentType, props: Props) {

}