import FlipdotDOM from "@owowagency/flipdot-dom";

/**
 * Same as createInstance, but for text nodes. 
 * If your renderer doesn't support text nodes, you can throw here.
 */
export function createTextInstance(text: string, rootContainer: FlipdotDOM) {
    // throw new Error('Text must be wrapped in a <text> element')
    return rootContainer.createTextElement(text);
}
