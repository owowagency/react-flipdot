import Yoga, { Display, MeasureMode } from "yoga-layout";
import BaseNode from "./BaseNode";
import { Color, TextAlign, type Style } from "../style";
import { applyStyle } from "../utils/applyStyle";
import FlipdotDOM from "../dom";
import {CanvasRenderingContext2D, createCanvas} from 'canvas';
import { getContext, measureText, type MeasuredText } from "@owowagency/flipdot-canvas";

const fontSize = 10;

type Size = {
    width: number;
    height: number;
}

export default class Text extends BaseNode {
    private _text: string;
    private root: FlipdotDOM;
    private previousDisplay: Display | null;
    private style: Style

    private measuredText: MeasuredText | null = null;

    
    constructor(text: string, root: FlipdotDOM) {
        super();
        this.node = Yoga.Node.create();
        this.node.setMeasureFunc(this.customMeasure.bind(this));
        this.root = root;
        this._text = text;
        this.style = {};
        this.previousDisplay = null;
    }

    private customMeasure(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): Size {
        const measured = measureText(this.text, { fontSize, maxWidth: width, maxHeight: height });
        this.measuredText = measured;
        return { width: measured.width, height: measured.height };
    }

    apply(style: Style): void {
        applyStyle(this.node, style);
        this.style = style;
        if (this.node.isDirty()) {
            this.root.measure();
            this.measuredText = null;
        }
        this.root.markWillDraw();
    }

    hide() {
        this.previousDisplay = this.node.getDisplay();
        this.node.setDisplay(Display.None);
        if (this.node.isDirty()) {
            this.root.measure();
            this.measuredText = null;
        }
    }

    unhide() {
        if (this.previousDisplay !== null) {
            this.node.setDisplay(this.previousDisplay);
        }
        this.previousDisplay = null;
        if (this.node.isDirty()) {
            this.root.measure();
            this.measuredText = null;
        }
    }

    free() {
        this.node.free();
    }

    postMeasure(): void {
        
    }

    get text() {
        return this._text;
    }

    setText(text: string) {
        if (this._text !== text) {
            this.node.markDirty();
            this.root.markWillDraw();
            this.measuredText = null;
        }

        this._text = text;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // TODO: Borders, padding etc.
        const measured = this.measuredText;
        if (!measured) {
            return
        }

        const layout = this.node.getComputedLayout();
        const color = this.style.color || Color.Transparent;
        switch (color) {
            case Color.Black: ctx.fillStyle = '#000';
            case Color.White: ctx.fillStyle = '#fff';
            case Color.Transparent: ctx.fillStyle = 'transparent';
        }
        ctx.font = `${fontSize}px monospace`;
        ctx.fillStyle = '#fff';

        let x = layout.left;
        let y = layout.top;

        for (const line of measured.lines) {
            switch (this.style.textAlign) {
                case TextAlign.Start: 
                    x = layout.left; 
                    break;
                case TextAlign.End: 
                    x = layout.left + (layout.width - line.width); 
                    break;
                case TextAlign.Center: 
                    x = x = layout.left + ((layout.width - line.width) / 2); 
                    break;
            }

            ctx.fillText(line.text, x, y);
            y += line.height;
        }
    }
}