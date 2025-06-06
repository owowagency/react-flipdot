import { Box, Text, Align, Color, Justify, TextAlign, Canvas, Display, Style } from "@owowagency/react-flipdot";
import { useCallback, useEffect, useRef, useState } from "react";
import {Marquee} from "@owowagency/flipdot-ui";

const remaining = (until: Date) => {
    const now = new Date();
    const distance = until.getTime() - now.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (days > 0) {
        const time = [hours, minutes].map((e) => e.toFixed(0).padStart(2, '0')).join(':');
        return `${days}D ${time}`
    }

    return [hours, minutes, seconds].map((e) => e.toFixed(0).padStart(2, '0')).join(':')
}

interface TestCanvasProps {
    style: Style
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function TestCanvas({ style }: TestCanvasProps) {
    const canvas = useRef(null);

    useEffect(() => {
        const ctx: CanvasRenderingContext2D | null = canvas.current?.getContext();
        if (!ctx) {
            return;
        }
        
        let x = 0;
        let y = 0;
        let forward = true;

        function draw() {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;

            ctx.clearRect(0, 0, width, height);

            if (x >= width || y > height || x < 0 || y < 0) {
                x = 0;
                y = 0;
                forward = true;
            }

            ctx.fillStyle = '#fff';
            ctx.fillRect(x, y, 1, 1);

            if (forward) {
                if (x + 1 >= width) {
                    forward = false;
                    y += 1;
                } else {
                    x += 1;
                }
            } else {
                if (x - 1 < 0) {
                    forward = true;
                    y += 1;
                } else {
                    x -= 1;
                }
            }
        }
        
        const handle = setInterval(draw, 50);
        draw();

        return () => clearInterval(handle);
    }, [canvas]);

    return (<Canvas style={style} ref={canvas} />)
}

export default function App() {
    const [end, setEnd] = useState<Date>(new Date(2025, 5, 5, 20, 0, 0, 0));
    const [mode, setMode] = useState<'countdown' | 'message' | 'test'>('test');
    const [text, setText] = useState(remaining(end));
    useEffect(() => {
        const handle = setInterval(() => {
            setText(remaining(end))
        }, 20);

        return () => { clearInterval(handle) }
    }, [setText, end]);

    const onDone = useCallback(() => {
        setMode('countdown');
    }, [setMode]);

    return (
        <Box style={{
            flex: 1, 
            alignItems: Align.Center,
            justifyContent: Justify.Center,
            borderWidth: 1,
            borderColor: Color.White
        }}>
            {mode === 'countdown' && <Text style={{color: Color.White, textAlign: TextAlign.Center}}>
                {text}
            </Text>}

            {mode === 'message' && <Marquee 
                style={{height: '100%', width: '100%'}} 
                onDone={onDone}
                interval={150} text="THIS IS A MARQUEE" 
            />}

            {mode === 'test' && <TestCanvas 
                style={{height: '100%', width: '100%'}} 
            />}
        </Box>
    );
}