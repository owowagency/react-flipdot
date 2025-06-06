import { BaseNode, Box, Container, Text } from "./components";
import Yoga, {Overflow} from 'yoga-layout';
import Canvas from "./components/Canvas";
import type { CanvasRenderingContext2D } from "canvas";

export default class FlipdotDOM extends Container {
    private width: number;
    private height: number;
    private willDraw: boolean;
    
    constructor(width: number, height: number) {
        super(Yoga.Node.create());
        this.width = width;
        this.height = height;
        this.node.setWidth(width);
        this.node.setHeight(height);
        this.node.setOverflow(Overflow.Hidden);
        this.children = [];
    }

    clear() {
        // this.node.free();
        this.children.splice(0, this.children.length);
    }

    createElement(type: 'box' | 'text' | 'canvas') {
        switch (type) {
            case 'box': return new Box(this);
            case 'text': return new Text('', this);
            case 'canvas': return new Canvas(this);
            default: throw new Error(`Attempt to create invalid element of type ${type}`);
        }
    }

    createTextElement(text: string) {
        return new Text(text, this);
    }

    measure() {
        this.node.calculateLayout(this.width, this.height);
        this.willDraw = true;
        this.postMeasure();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.willDraw = false;
    }

    postMeasure(): void {
        for (const child of this.children) {
            child.postMeasure();
        }
    }
    
    shouldDraw() {
        return this.willDraw;
    }

    markWillDraw() {
        this.willDraw = true;
    }

    markWillNotDraw() {
        this.willDraw = false;
    }

    append(node: BaseNode): void {
        super.append(node);
        if (this.node.isDirty()) {
            this.measure();
        }
    }

    appendBefore(node: BaseNode, before: BaseNode): void {
        super.appendBefore(node, before);
        if (this.node.isDirty()) {
            this.measure();
        }
    }

    remove(node: BaseNode): void {
        super.remove(node);
        if (this.node.isDirty()) {
            this.measure();
        }
    }
}