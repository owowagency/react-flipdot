import { Edge, type Node } from "yoga-layout";
import { Color, type Style } from "../style";
import {CanvasRenderingContext2D} from 'canvas';

export function drawBorder(node: Node, style: Style, ctx: CanvasRenderingContext2D) {
    const layout = node.getComputedLayout();
    const borderColor = style.borderColor || Color.Transparent;
    const borderTop = node.getComputedBorder(Edge.Top);
    const borderBottom = node.getComputedBorder(Edge.Bottom);
    const borderStart = node.getComputedBorder(Edge.Start);
    const borderEnd = node.getComputedBorder(Edge.End);

    // TODO: Border width!!
    // Draw top border
    if (borderTop > 0) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(layout.left, layout.top, layout.width, borderTop);
    }

    // Draw bottom border
    if (borderBottom > 0) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(layout.left, layout.top + layout.height - borderBottom, layout.width, borderBottom);
    }

    // Draw start border
    if (borderStart > 0) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(layout.left, layout.top, borderStart, layout.height);
    }

    // Draw end border
    if (borderEnd > 0) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(layout.left + layout.width - borderEnd, layout.top, borderEnd, layout.height);
    }
}