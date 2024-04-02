import {CanvasPosition} from "./canvas-position";

export enum CornerType {
    topLeft, topRight, bottomLeft, bottomRight
}

export class CanvasCorner {
    readonly point: CanvasPosition;
    readonly corner: CornerType;
    readonly xDirection: number;
    readonly yDirection: number;

    constructor(point: CanvasPosition, corner: CornerType) {
        this.point = point;
        this.corner = corner;
        this.xDirection = corner == CornerType.topLeft || corner == CornerType.bottomLeft ? +1 : -1;
        this.yDirection = corner == CornerType.topLeft || corner == CornerType.topRight ? +1 : -1;
    }
}