import Reconciler from 'react-reconciler';
import { createInstance } from './createInstance';
import { createTextInstance } from './createTextInstance';
import { appendInitialChild } from './appendInitialChild';
import { finalizeInitialChildren } from './finalizeInitialChildren';
import { shouldSetTextContent } from './shouldSetTextContent';
import { getRootHostContext } from './getRootHostContext';
import { getChildHostContext } from './getChildHostContext';
import { getPublicInstance } from './getPublicInstance';
import { prepareForCommit } from './prepareForCommit';
import { resetAfterCommit } from './resetAfterCommit';
import { preparePortalMount } from './preparePortalMount';
import { scheduleTimeout } from './scheduleTimeout';
import { cancelTimeout } from './cancelTimeout';
import { scheduleMicrotask } from './scheduleMicrotask';
import { getCurrentEventPriority } from './getCurrentEventPriority';
import { appendChild } from './appendChild';
import { appendChildToContainer } from './appendChildToContainer';
import { insertBefore } from './insertBefore';
import { insertInContainerBefore } from './insertInContainerBefore';
import { removeChild } from './removeChild';
import { removeChildFromContainer } from './removeChildFromContainer';
import { resetTextContent } from './resetTextContent';
import { commitTextUpdate } from './commitTextUpdate';
import { commitMount } from './commitMount';
import { commitUpdate } from './commitUpdate';
import { hideInstance } from './hideInstance';
import { hideTextInstance } from './hideTextInstance';
import { unhideInstance } from './unhideInstance';
import { unhideTextInstance } from './unhideTextInstance';
import { clearContainer } from './clearContainer';
import { maySuspendCommit } from './maySuspendCommit';
import { preloadInstance } from './preloadInstance';
import { startSuspendingCommit } from './startSuspendingCommit';
import { suspendInstance } from './suspendInstance';
import { waitForCommitToBeReady } from './waitForCommitToBeReady';
import { DefaultEventPriority } from 'react-reconciler/constants.js';

const hostConfig = {
    supportsMutation: true,
    supportsPersistence: false,
    
    // render phase
    createInstance,
    createTextInstance,
    appendInitialChild,
    finalizeInitialChildren,
    shouldSetTextContent,
    getRootHostContext,
    getChildHostContext,
    getPublicInstance,
    prepareForCommit,
    resetAfterCommit,
    preparePortalMount,
    scheduleTimeout,
    cancelTimeout,
    noTimeout: -1,
    supportsMicrotasks: true,
    scheduleMicrotask,
    isPrimaryRenderer: true,
    getCurrentEventPriority,

    // mutation
    appendChild,
    appendChildToContainer,
    insertBefore,
    insertInContainerBefore,
    removeChild,
    removeChildFromContainer,
    resetTextContent,
    commitTextUpdate,
    commitMount,
    commitUpdate,
    hideInstance,
    hideTextInstance,
    unhideInstance,
    unhideTextInstance,
    clearContainer,
    maySuspendCommit,
    preloadInstance,
    startSuspendingCommit,
    suspendInstance,
    waitForCommitToBeReady,

    // Some methods that are required but undocumented
    resolveUpdatePriority() {
        return DefaultEventPriority;
    },
    getCurrentUpdatePriority() {
        return DefaultEventPriority;
    },
    setCurrentUpdatePriority() {

    },
    detachDeletedInstance() {

    },
    // Idk what these do
    // resolveUpdatePriority() {
    //     return DefaultEventPriority;
    // },
    // getCurrentUpdatePriority() {
    //     return DefaultEventPriority;
    // },
    // setCurrentUpdatePriority() {

    // },
    // prepareToCommitHoistables() {

    // },
    // getHoistableRoot() {

    // },
    // getInstanceFromNode() {

    // }, 
    // beforeActiveInstanceBlur() {

    // }, 
    // afterActiveInstanceBlur() {

    // },
    // prepareScopeUpdate() {

    // }, 
    // getInstanceFromScope() {

    // }, 
    // detachDeletedInstance() {

    // }, 
    // NotPendingTransition: -1,
};

const ProxyConfig = new Proxy(hostConfig, {
    get(target, p, receiver) {
        if (p in target) {
            return target[p]
        }

        return function() {
            console.log(`${p.toString()}()`)
        }
    },
})

// @ts-ignore
const FlipdotReconciler = Reconciler(hostConfig);

export default FlipdotReconciler;