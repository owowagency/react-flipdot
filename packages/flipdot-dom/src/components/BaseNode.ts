import type { Node } from 'yoga-layout';
import type { Style } from '../style';
import {CanvasRenderingContext2D} from 'canvas';

let prevId = 0;

export default abstract class BaseNode {
    id: string;
    node: Node;
    abstract free(): void;
    abstract hide(): void;
    abstract unhide(): void;
    abstract apply(style: Style): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;

    abstract postMeasure(): void;

    constructor() {
        this.id = crypto.randomUUID();
    }
}