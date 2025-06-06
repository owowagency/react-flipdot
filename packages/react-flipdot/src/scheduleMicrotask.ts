/**
 * Optional. You can proxy this to queueMicrotask or its equivalent in your environment.
 */
export function scheduleMicrotask(fn: VoidFunction) {
    return queueMicrotask(fn);
}