import React, { type ReactNode } from "react";
import type { Props } from "../types";

export function Text(props: Props): ReactNode {
    // @ts-ignore
    return <text {...props} />;
}