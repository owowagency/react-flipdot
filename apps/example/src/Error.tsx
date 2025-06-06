import { Box, Text, Justify, Color, Align } from "@owowagency/react-flipdot";
import { useEffect, useState } from "react";

export default function Error() {
    const [on, setOn] = useState(true);
    useEffect(() => {
        const handle = setInterval(() => {
            setOn(c => !c);
        }, 333);

        return () => { clearInterval(handle) }
    }, [setOn]);

    return (
        <Box style={{
            flex: 1, 
            alignItems: Align.Center, 
            justifyContent: Justify.Center, 
            borderWidth: 1, 
            padding: 1, 
            borderColor: Color.White
        }}>
            <Text style={{color: on ? Color.White : Color.Black}}>
                {'ERROR :('}!
            </Text>
        </Box>
    )
}