import type { ComponentType, Props } from "./types";

/**
 * This method may be called during render if the Host Component type and props might suspend a commit. 
 * It can be used to initiate any work that might shorten the duration of a suspended commit.
 */
export function preloadInstance(type: ComponentType, props: Props) {

}