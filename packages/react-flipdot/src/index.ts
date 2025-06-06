import FlipdotDOM from '@owowagency/flipdot-dom';
import FlipdotReconciler from "./reconciler";
import type { Props } from './types';
import { create } from '@owowagency/flipdot-renderer';
import { createCanvas } from 'canvas';
import { getContext } from '@owowagency/flipdot-canvas';
import { Canvas } from './components/Canvas';
import { Box } from './components/Box';
import { Text } from './components/Text';
export * from '@owowagency/flipdot-dom';

interface Options {
    mode: 'tty' | 'flipdot',
    debug: boolean,
}

const ReactFlipdot = {
    render(something: any, options: Partial<Options>) {
        const mode = options.mode || 'flipdot';
        const debug = typeof options.debug === 'boolean' ? options.debug : false;
        const renderer = create(mode);
        const root = new FlipdotDOM(renderer.width, renderer.height);
        const canvas = createCanvas(renderer.width, renderer.height);
        const ctx = getContext(canvas);

        const container = FlipdotReconciler.createContainer(
            root, // container info
            null, // tag 
            null, // hydrationCallbacks
            false, // isStrictMode
            null, // concurrentUpdatesByDefaultOverride
            '', // identifierPrefix
            () => {},
            null,
        );
        container.onCaughtError = () => {};
        
        FlipdotReconciler.updateContainer(something, container, null, null);

        if (mode === 'tty' && debug) {
            setInterval(() => {
                if (root.shouldDraw()) {
                    console.log(root);
                    root.markWillNotDraw();
                }
            }, 50);
            return
        }

        renderer.start();
        setInterval(() => {
            if (root.shouldDraw()) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                root.draw(ctx);
                renderer.render(ctx);
            }
        }, 50);
    },
}

export type { Props };
export { Box, Canvas, Text };
export default ReactFlipdot;