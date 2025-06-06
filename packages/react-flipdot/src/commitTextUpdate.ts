import { Text } from "@owowagency/flipdot-dom";

/**
 * This method should mutate the textInstance and update its text content to nextText.
 * Here, textInstance is a node created by createTextInstance.
 */
export function commitTextUpdate(textInstance: Text, prevText: string, nextText: string) {
    textInstance.setText(nextText);
}