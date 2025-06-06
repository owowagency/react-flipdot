import Yoga from 'yoga-layout';
import Container from './Container';
import FlipdotDOM from '../dom';
import type { Style } from '../style';
import type BaseNode from './BaseNode';

export default class Box extends Container {
    private root: FlipdotDOM
    constructor(root: FlipdotDOM) {
        super(Yoga.Node.create());
        this.root = root;
    }

    postMeasure(): void {
        for (const child of this.children) {
            child.postMeasure();
        }
    }

    apply(style: Style): void {
        super.apply(style);
        if (this.node.isDirty()) {
            this.root.markWillDraw();
            this.root.measure();
        }
        this.root.markWillDraw();
    }

    append(node: BaseNode): void {
        super.append(node);
        if (this.node.isDirty()) {
            this.root.measure();
        }
    }

    appendBefore(node: BaseNode, before: BaseNode): void {
        super.appendBefore(node, before);
        if (this.node.isDirty()) {
            this.root.measure();
        }
    }

    remove(node: BaseNode): void {
        super.remove(node);
        if (this.node.isDirty()) {
            this.root.measure();
        }
    }
}