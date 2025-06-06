/**
 * This method lets you store some information before React starts making changes to the tree on the screen. 
 * For example, the DOM renderer stores the current text selection so that it can later restore it. 
 * This method is mirrored by resetAfterCommit.
 *
 * Even if you don't want to do anything here, you need to return null from it.
 */
export function prepareForCommit(containerInfo) {
    return null;
}