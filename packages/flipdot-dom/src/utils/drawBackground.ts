import { Edge, type Node } from "yoga-layout";
import { Color, type Style } from "../style";
import {CanvasRenderingContext2D} from 'canvas';

export function drawBackground(node: Node, style: Style, ctx: CanvasRenderingContext2D) {
    const layout = node.getComputedLayout();
    const backgroundColor = style.backgroundColor || Color.Transparent;

    const borderTop = node.getComputedBorder(Edge.Top);
    const borderBottom = node.getComputedBorder(Edge.Bottom);
    const borderStart = node.getComputedBorder(Edge.Start);
    const borderEnd = node.getComputedBorder(Edge.End);

    const paddingTop = node.getComputedPadding(Edge.Top);
    const paddingBottom = node.getComputedPadding(Edge.Bottom);
    const paddingStart = node.getComputedPadding(Edge.Start);
    const paddingEnd = node.getComputedPadding(Edge.End);

    const x = borderStart + paddingStart + layout.left;
    const y = borderTop + paddingTop + layout.top;
    const w = layout.width - borderEnd - paddingEnd;
    const h = layout.height - borderBottom - paddingBottom;
    switch (backgroundColor) {
        case Color.Black: ctx.fillStyle = '#000';
        case Color.White: ctx.fillStyle = '#fff';
        case Color.Transparent: ctx.fillStyle = 'transparent';
    }
    ctx.fillRect(x, y, w, h);
}