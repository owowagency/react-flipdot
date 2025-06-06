import { Edge, type Node, Display as YogaDisplay, FlexDirection as YogaFlexDirection, Align as YogaAlign, Justify as YogaJustify } from "yoga-layout";
import { Align, Display, FlexDirection, type Insets, Justify, type Style } from "../style";

type ApplyEdge = (edge: Edge, size?: number) => void;

function applyInsets(insets: number | Insets | undefined, fn: ApplyEdge) {
    fn(Edge.All, 0);

    if (typeof insets === 'number') {
        return fn(Edge.All, insets);
    }

    if (insets === undefined || insets === null) {
        return;
    }

    if ('vertical' in insets) {
        fn(Edge.Vertical, insets.vertical);
    }

    if ('horizontal' in insets) {
        fn(Edge.Horizontal, insets.horizontal);
    }

    if ('top' in insets) {
        fn(Edge.Top, insets.top);
    }

    if ('bottom' in insets) {
        fn(Edge.Bottom, insets.bottom);
    }    

    if ('start' in insets) {
        fn(Edge.Start, insets.start);
    }

    if ('end' in insets) {
        fn(Edge.End, insets.end);
    }
}

function applyAllInsets(node: Node, style: Style) {
    applyInsets(style.borderWidth, (edge, size) => node.setBorder(edge, size));
    applyInsets(style.padding, (edge, size) => node.setPadding(edge, size));
    applyInsets(style.margin, (edge, size) => node.setMargin(edge, size));
}

function mapAlign(align?: Align): YogaAlign {
    switch (align) {
        case Align.Auto: return YogaAlign.Auto;
        case Align.FlexStart: return YogaAlign.FlexStart;
        case Align.Center: return YogaAlign.Center;
        case Align.FlexEnd: return YogaAlign.FlexEnd;
        case Align.Stretch: return YogaAlign.Stretch;
        case Align.Baseline: return YogaAlign.Baseline;
        case Align.SpaceBetween: return YogaAlign.SpaceBetween;
        case Align.SpaceAround: return YogaAlign.SpaceAround;
        case Align.SpaceEvenly: return YogaAlign.SpaceEvenly;
        default: return YogaAlign.Auto;
    }
}

function mapJustify(justify?: Justify): YogaJustify {
    switch (justify) {
        case Justify.FlexStart: return YogaJustify.FlexStart;
        case Justify.Center: return YogaJustify.Center;
        case Justify.FlexEnd: return YogaJustify.FlexEnd;
        case Justify.SpaceBetween: return YogaJustify.SpaceBetween;
        case Justify.SpaceAround: return YogaJustify.SpaceAround;
        case Justify.SpaceEvenly: return YogaJustify.SpaceEvenly;
        default: return YogaJustify.FlexStart;
    }
}

function applyFlexSettings(node: Node, style: Style) {
    switch (style.flexDirection) {
        case FlexDirection.Column: node.setFlexDirection(YogaFlexDirection.Column);
        case FlexDirection.ColumnReverse: node.setFlexDirection(YogaFlexDirection.ColumnReverse);
        case FlexDirection.Row: node.setFlexDirection(YogaFlexDirection.Row);
        case FlexDirection.RowReverse: node.setFlexDirection(YogaFlexDirection.RowReverse);
        default: node.setFlexDirection(YogaFlexDirection.Column);
    }

    if (typeof style.flex === 'number') {
        node.setFlex(style.flex);
    } else {
        node.setFlex(undefined);
    }

    node.setJustifyContent(mapJustify(style.justifyContent));
    node.setAlignContent(mapAlign(style.alignContent));    
    node.setAlignItems(mapAlign(style.alignItems));    
    node.setAlignSelf(mapAlign(style.alignSelf));    
}

function applyDisplaySettings(node: Node, style: Style) {
    switch (style.display) {
        case Display.Flex: node.setDisplay(YogaDisplay.Flex);
        case Display.None: node.setDisplay(YogaDisplay.None);
        default: node.setDisplay(YogaDisplay.Flex);
    }
}

export function applyStyle(node: Node, style: Style) {
    if (typeof style.width === 'number' || typeof style.width === 'string') {
        node.setWidth(style.width);
    } else {
        node.setWidthAuto();
    }

    if (typeof style.height === 'number' || typeof style.height === 'string') {
        node.setHeight(style.height);
    } else {
        node.setHeightAuto();
    }

    applyDisplaySettings(node, style);
    applyFlexSettings(node, style);
    applyAllInsets(node, style);
}