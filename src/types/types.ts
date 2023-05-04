export enum Direction {
    right,
    Up,
    Left,
    Down,
}

export interface GestureEventType {
    nativeEvent: {translationX: number; translationY: number};
}

export interface Coordinate {
    x: number;
    y: number;
}