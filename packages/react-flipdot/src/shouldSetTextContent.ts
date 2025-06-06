import type { ComponentType, Props } from "./types";

/**
 * Some target platforms support setting an instance's text content without manually creating a text node. 
 * For example, in the DOM, you can set node.textContent instead of creating a text node and appending it.
 * 
 * If you return true from this method, React will assume that this node's children are text, 
 * and will not create nodes for them. 
 * It will instead rely on you to have filled that text during createInstance. 
 * This is a performance optimization. 
 * For example, the DOM renderer returns true only if type is a known text-only parent (like 'textarea') 
 * or if props.children has a 'string' type. 
 * If you return true, you will need to implement resetTextContent too.
 * 
 * If you don't want to do anything here, you should return false.
 * 
 * This method happens in the render phase. Do not mutate the tree from it.
 */
export function shouldSetTextContent(type: ComponentType, props: Props) {
    return type === 'text';
}