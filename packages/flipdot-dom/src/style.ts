export enum Display {
    Flex = 'flex',
    None = 'none',
}

export enum Justify {
    FlexStart = 'flex-start',
    Center = 'center',
    FlexEnd = 'flex-end',
    SpaceBetween = 'space-between',
    SpaceAround = 'space-around',
    SpaceEvenly = 'space-evenly'
}

export enum Align {
    Auto = 'auto',
    FlexStart = 'flex-start',
    Center = 'center',
    FlexEnd = 'flex-end',
    Stretch = 'stretch',
    Baseline = 'baseline',
    SpaceBetween = 'space-between',
    SpaceAround = 'space-around',
    SpaceEvenly = 'space-evenly'
}

export enum FlexDirection {
    Column = 'column',
    Row = 'row',
    ColumnReverse = 'column-reverse',
    RowReverse = 'row-reverse',
}

export enum Color {
    Transparent = 'transparent',
    Black = 'black',
    White = 'white',
} 

export enum TextAlign {
    Start = 'start',
    End = 'end',
    Center = 'center',
}

export type Insets = {
    start?: number;
    end?: number;
    top?: number;
    bottom?: number;
} | {
    horizontal?: number;
    vertical?: number;
}

export type Padding = Insets;
export type Margin = Insets;
export type BorderWidth = Insets;

export interface Style {
    width?: number | `${number}%` | 'auto';
    height?: number | `${number}%` | 'auto';
    flex?: number;
    flexDirection?: FlexDirection,
    alignItems?: Align,
    alignContent?: Align,
    alignSelf?: Align,
    textAlign?: TextAlign,
    justifyContent?: Justify,
    display?: Display,
    backgroundColor?: Color;
    borderColor?: Color;
    color?: Color;
    borderWidth?: number | Insets;
    padding?: number | Padding;
    margin?: number | Margin;
}