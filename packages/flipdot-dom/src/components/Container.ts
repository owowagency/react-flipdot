import { Display, type Node } from 'yoga-layout';
import BaseNode from "./BaseNode";
import type { Style } from '../style';
import { applyStyle } from '../utils/applyStyle';
import { drawBorder } from '../utils/drawBorder';
import { drawBackground } from '../utils/drawBackground';
import {CanvasRenderingContext2D} from 'canvas';

export default abstract class Container extends BaseNode {
    protected children: BaseNode[];
    private previousDisplay: Display | null;
    style: Style;

    constructor(node: Node) {
        super();
        this.node = node;
        this.children = [];
        this.previousDisplay = null;
        this.style = {};
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawBorder(this.node, this.style, ctx);
        drawBackground(this.node, this.style, ctx);

        for (const child of this.children) {
            child.draw(ctx);
        }
    }

    apply(style: Style): void {
        applyStyle(this.node, style);
        this.style = style;
    }

    hide() {
        this.previousDisplay = this.node.getDisplay();
        this.node.setDisplay(Display.None);
    }

    unhide() {
        if (this.previousDisplay !== null) {
            this.node.setDisplay(this.previousDisplay);
        }
        this.previousDisplay = null;
    }

    free(): void {
        this.node.free();
    }

    freeRecursive() {
        this.node.freeRecursive();
    }

    append(node: BaseNode) {
        this.node.insertChild(node.node, this.node.getChildCount());
        this.children.push(node);
    }

    remove(node: BaseNode) {
        const index = this.children.findIndex(c => c.id === node.id);
        if (index != -1) {
            const child = this.node.getChild(index);
            this.node.removeChild(child);
            child.freeRecursive();
            this.children.splice(index, 1);
        }
    }

    appendBefore(node: BaseNode, before: BaseNode) {
        // First check if the node being inserted is already a child
        const index = this.children.findIndex(c => c.id === node.id);
        if (index != -1) {
            const child = this.node.getChild(index);
            this.node.removeChild(child);
            this.children.splice(index, 1);
        }

        // Insert the node at the correct index
        const indexOfBefore = this.children.findIndex(c => c.id === before.id);
        if (indexOfBefore != -1) {
            this.node.insertChild(node.node, indexOfBefore);
            this.children.splice(indexOfBefore, 0, node);
        }
    }
}