import { DefaultEventPriority } from 'react-reconciler/constants.js';

/**
 * To implement this method, you'll need some constants available on the special react-reconciler/constants entry point
 * 
 * The constant you return depends on which event, if any, is being handled right now. 
 * (In the browser, you can check this using window.event && window.event.type).
 *
 * - Discrete events: 
 *   If the active event is directly caused by the user (such as mouse and keyboard events) 
 *   and each event in a sequence is intentional (e.g. click), return DiscreteEventPriority. 
 *   This tells React that they should interrupt any background work and cannot be batched across time.
 *
 * - Continuous events: 
 *   If the active event is directly caused by the user but the user can't distinguish between individual events in a sequence (e.g. mouseover),
 *   return ContinuousEventPriority. This tells React they should interrupt any background work but can be batched across time.

 * - Other events / No active event: 
 *   In all other cases, return DefaultEventPriority. 
 *   This tells React that this event is considered background work, and interactive events will be prioritized over it.
 *
 * You can consult the getCurrentEventPriority() implementation in ReactFiberConfigDOM.js for a reference implementation.
 */
export function getCurrentEventPriority() {
    return DefaultEventPriority;
}