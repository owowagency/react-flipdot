/**
 * This method is called after all suspendInstance calls are complete.
 * 
 * Return null if the commit can happen immediately.
 * 
 * Return `(initiateCommit: Function) => Function` if the commit must be suspended. 
 * The argument to this callback will initiate the commit when called. 
 * The return value is a cancellation function that the Reconciler can use to abort the commit.
 */
export function waitForCommitToBeReady() {
    return null;
}