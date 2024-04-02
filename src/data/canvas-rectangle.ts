import {CanvasPosition} from "./canvas-position";
import {CSSProperties} from "react";
import {CssPropertiesUtils} from "./css-properties-utils";

export class CanvasRectangle {
    p1: CanvasPosition;
    p2: CanvasPosition;

    constructor(p1: CanvasPosition, p2: CanvasPosition) {
        this.p1 = p1;
        this.p2 = p2;
    }

    toStyle(): CSSProperties {
        return CssPropertiesUtils.absolutePositioning(this.p1, this.p2);
    }
}

