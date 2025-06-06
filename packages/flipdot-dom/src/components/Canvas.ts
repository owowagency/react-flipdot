import Yoga, { Display } from "yoga-layout";
import BaseNode from "./BaseNode";
import { type Style } from "../style";
import { applyStyle } from "../utils/applyStyle";
import FlipdotDOM from "../dom";
import {CanvasRenderingContext2D, createCanvas, ImageData, Canvas as NodeCanvas} from 'canvas';
import { getContext } from "@owowagency/flipdot-canvas";

function createProxy(ctx: CanvasRenderingContext2D, instance: Canvas): CanvasRenderingContext2D {
    return new Proxy(ctx, {
        get(target: CanvasRenderingContext2D, property: string | symbol) {
            const value = target[property];

            if (typeof value === 'function') {
                return function () {
                    const returnValue = value.call(target, ...arguments);
                    instance.markWillDraw();
                    return returnValue;
                }
            }

            return value;
        },
        set(target: CanvasRenderingContext2D, p: string | symbol, newValue: any) {
            target[p] = newValue;
            return true;
        },
    });
}

export default class Canvas extends BaseNode {
    private root: FlipdotDOM;
    private previousDisplay: Display | null;
    private style: Style
    private canvas: NodeCanvas;
    private context: CanvasRenderingContext2D;
    
    constructor(root: FlipdotDOM) {
        super();
        this.node = Yoga.Node.create();
        this.root = root;
        this.style = {};
        this.previousDisplay = null;
        const layout = this.node.getComputedLayout();
        this.canvas = createCanvas(layout.width, layout.height);
        this.context = createProxy(getContext(this.canvas), this);
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    markWillDraw() {
        this.root.markWillDraw();
    }

    apply(style: Style): void {
        applyStyle(this.node, style);
        this.style = style;
        if (this.node.isDirty()) {
            this.root.measure();
        }
        this.markWillDraw();
    }

    hide() {
        this.previousDisplay = this.node.getDisplay();
        this.node.setDisplay(Display.None);
        if (this.node.isDirty()) {
            this.root.measure();
        }
    }

    unhide() {
        if (this.previousDisplay !== null) {
            this.node.setDisplay(this.previousDisplay);
        }
        this.previousDisplay = null;
        if (this.node.isDirty()) {
            this.root.measure();
        }
    }

    free() {
        this.node.free();
    }

    postMeasure(): void {
        const layout = this.node.getComputedLayout();
        if (this.canvas.width !== layout.width || this.canvas.height !== layout.height) {
            this.canvas.width = layout.width;
            this.canvas.height = layout.height;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // TODO: Borders, padding etc.
        const layout = this.node.getComputedLayout();
        ctx.drawImage(this.context.canvas, layout.left, layout.top);
    }
}