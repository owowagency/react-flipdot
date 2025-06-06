import React, { type ReactNode, type Ref } from "react";
import type { Props as ReactProps } from "../types";
import type { CanvasRenderingContext2D } from "canvas";

interface JsxCanvas {
    getContext(): CanvasRenderingContext2D;
    markWillDraw(): void
}

interface Props extends ReactProps {
    ref?: Ref<JsxCanvas>
}

export function Canvas(props: Props): ReactNode {
    // @ts-ignore
    return <canvas {...props} />;
}