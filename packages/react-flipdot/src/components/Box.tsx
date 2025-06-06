import React, { type ReactNode } from "react";
import type { Props } from "../types";

export function Box(props: Props): ReactNode {
    // @ts-ignore
    return <box {...props} />;
}