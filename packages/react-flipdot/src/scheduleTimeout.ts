/**
 * You can proxy this to setTimeout or its equivalent in your environment.
 */
export function scheduleTimeout(fn: TimerHandler, delay: number) {
    return setTimeout(fn, delay);
}