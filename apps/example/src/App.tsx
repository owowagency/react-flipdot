import { Box, Text, Align, Color, Justify, TextAlign } from "@owowagency/react-flipdot";
import { useEffect, useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const handle = setInterval(() => {
            setCount(c => c + 1)
        }, 333);

        return () => { clearInterval(handle) }
    }, [setCount]);

    useEffect(() => {
        if (count > 25) {
            throw new Error('Hello');
        }
    }, [count]);

    return (
        <Box style={{
            flex: 1, 
            alignItems: Align.Center,
            justifyContent: Justify.Center,
            borderWidth: 1, 
            padding: 1, 
            borderColor: Color.White
        }}>
            <Text style={{color: Color.White, textAlign: TextAlign.Center}}>
                COUNTER: {count} !!!
            </Text>
        </Box>
    );
}