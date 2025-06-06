import { Canvas } from "@owowagency/react-flipdot";
import { type Style } from "@owowagency/flipdot-dom";
import { useEffect, useRef } from "react";
import { measureCharacter } from "@owowagency/flipdot-canvas";

const fontSize = 10;

interface Props {
    style: Style;
    text: string;
    interval: number;
    onDone: () => void;
}

interface MeasuredCharacter {
    character: string;
    width: number;
    height: number;
}

interface Measured {
    characters: MeasuredCharacter[],
    height: number;
    width: number;
}

function measure(text: string): Measured {
    const measured: Measured = {
        characters: [],
        height: 0,
        width: 0,
    };
    for (const char of text) {
        const metrics = measureCharacter(char, { fontSize });
        measured.characters.push({ character: char, width: metrics.width, height: metrics.actualBoundingBoxDescent });
        if (metrics.actualBoundingBoxDescent > measured.height) {
            measured.height = metrics.actualBoundingBoxDescent;
        }
        measured.width += metrics.width
    }
    return measured;
}

function calculateWillFit(measured: Measured, offset: number, maxWidth: number): [Measured, boolean] {
    const onScreen: Measured = {characters: [], width: 0, height: 0};

    for (let i = offset; i < measured.characters.length; i += 1) {
        const char = measured.characters[i];
        if (onScreen.width + char.width > maxWidth) {
            return [onScreen, false];
        }
        onScreen.characters.push(char);
        onScreen.width += char.width
        if (char.height > onScreen.height) {
            onScreen.height = char.height;
        }
    }

    return [onScreen, true];
}

function Marquee({style, text, interval, onDone}: Props) {
    const canvas = useRef(null);

    useEffect(() => {
        const ctx: CanvasRenderingContext2D | null = canvas.current?.getContext();
        if (!ctx) {
            return;
        }

        const padding = ' '.repeat(5);
        const textWithPadding = `${padding}${text}${padding}`;
        const measured = measure(textWithPadding);
        let charOffset = 0;

        function draw() {
            const maxWidth = ctx.canvas.width;
            const maxHeight = ctx.canvas.height;
            const [onScreen, done] = calculateWillFit(measured, charOffset, maxWidth);
            const onScreenText = onScreen.characters.map((c) => c.character).join('');
            
            ctx.clearRect(0, 0, maxWidth, maxHeight);
            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = '#fff';
            ctx.fillText(onScreenText, 0, (maxHeight / 2) + (fontSize / 2));

            if (done) {
                onDone();
            } else {
                charOffset += 1;
            }
        }

        const handle = setInterval(draw, interval);

        draw();

        return () => clearInterval(handle);
    }, [text, interval, onDone, canvas]);

    return <Canvas style={style} ref={canvas} />
}

export default Marquee;