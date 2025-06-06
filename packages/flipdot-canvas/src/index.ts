import { Canvas, CanvasRenderingContext2D, createCanvas, registerFont, type TextMetrics } from "canvas";
import { fontData } from "./monospace";
import { writeFileSync } from 'fs';
import { resolve } from "path";
import { tmpdir } from "os";

const pathToFont = resolve(tmpdir(), 'flipdot-monospace.ttf');
writeFileSync(pathToFont, Buffer.from(fontData, 'base64'));
registerFont(pathToFont, { family: 'monospace' });

const fontSize = 10;

export function getContext(canvas: Canvas): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = false;
    ctx.quality = 'nearest';
    ctx.patternQuality = 'nearest';
    ctx.font = `${fontSize}px monospace`;
    ctx.antialias = 'none';
    ctx.textDrawingMode = 'glyph';
    ctx.textBaseline = 'top';
    return ctx;
}

const measureCanvas = createCanvas(1000, 500);
const measureContext = getContext(measureCanvas);

export interface MeasureOptions {
    maxWidth: number,
    maxHeight: number,
    fontSize: number,
    maxLines?: number;
}

export interface Measurement {
    text: string;
    width: number;
    height: number;
}

export interface MeasuredText {
    lines: Measurement[];
    width: number;
    height: number;
}

export interface MeasureCharacterOptions {
    fontSize: number;
}

export function measureCharacter(char: string, options: MeasureCharacterOptions): TextMetrics {
    measureContext.font = `${options.fontSize}px monospace`;
    return measureContext.measureText(char);
}

export function measureText(text: string, options: MeasureOptions): MeasuredText {
    const maxLines = options.maxLines || Number.MAX_SAFE_INTEGER;
    const maxWidth = options.maxWidth;
    const maxHeight = options.maxHeight;
    measureContext.font = `${options.fontSize}px monospace`;

    const measured: MeasuredText = { width: 0, height: 0, lines: [] };
    let currentMeasurement: Measurement = { text: '', width: 0, height: 0 };

    function reset() {
        currentMeasurement.width = 0;
        currentMeasurement.height = 0;
        currentMeasurement.text = '';
    }

    function push() {
        if (currentMeasurement.width === 0 && currentMeasurement.height === 0 && currentMeasurement.text === '') {
            return
        }

        measured.height += currentMeasurement.height;
        if (currentMeasurement.width > measured.width) {
            measured.width = currentMeasurement.width;
        }
        measured.lines.push({...currentMeasurement});
        reset();
    }

    for (const char of text) {
        if (char === '\n') {
            // TODO: newlines are ignored for now
            continue
        }

        const m = measureContext.measureText(char);
        const charHeight = m.actualBoundingBoxDescent;
        const charWidth = m.width;

        if (currentMeasurement.width + charWidth > maxWidth) {
            push();

            // If we move the character to the next line we exceed maxHeight, we are done
            if (measured.height + m.actualBoundingBoxDescent > maxHeight) {
                break
            }

            // If we start a new line, we exceed max lines limit, we are done
            if (measured.lines.length + 1 > maxLines) {
                break
            }
        }

        const nextLineHeight = charHeight > currentMeasurement.height ? charHeight : currentMeasurement.height;

        // If adding this character to the current line causes the total height to exceed the max height, exit
        if (measured.height + nextLineHeight > maxHeight) {
            break
        }

        // Append the character
        currentMeasurement.text += char;
        currentMeasurement.width += charWidth;
        if (charHeight > currentMeasurement.height) {
            currentMeasurement.height = charHeight;
        }
    }

    push();

    return measured;
}