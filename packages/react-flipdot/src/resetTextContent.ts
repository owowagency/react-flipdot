import { Text } from "@owowagency/flipdot-dom";

/**
 * If you returned true from shouldSetTextContent for the previous props, 
 * but returned false from shouldSetTextContent for the next props, 
 * React will call this method so that you can clear the text content you were managing manually. 
 * For example, in the DOM you could set node.textContent = ''.
 * 
 * If you never return true from shouldSetTextContent, you can leave it empty.
 */
export function resetTextContent(instance: Text) {
    instance.setText('');
}