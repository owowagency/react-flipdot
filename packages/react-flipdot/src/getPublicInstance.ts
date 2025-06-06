
/**
 * Determines what object gets exposed as a ref. You'll likely want to return the instance itself. 
 * But in some cases it might make sense to only expose some part of it.
 * 
 * If you don't want to do anything here, return instance.
 */
export function getPublicInstance(instance) {
    return instance;
}