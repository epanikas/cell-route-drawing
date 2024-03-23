import React, {CSSProperties, JSX} from "react";
import {CellRouteSegment} from "../../data/cell-route";
import {LayoutPosition} from "../../data/layout-position";
import {CanvasPosition} from "../../data/canvas-position";
import {BoxSize} from "../../data/box-size";


export class RouteWireSegmentProps {
    routeId: string
    cellSize: BoxSize;
    routeSegment: CellRouteSegment;
    lineWidth: number = 5;
    borderWidth: number = 2;
    radius: number = 10;
    color: string = "red";
    prevSegment?: CellRouteSegment;
    nextSegment?: CellRouteSegment;

    constructor(routeId: string, cellSize: BoxSize, routeSegment: CellRouteSegment) {
        this.routeId = routeId;
        this.cellSize = cellSize;
        this.routeSegment = routeSegment;
    }
}

export enum CornerMarker {
    // straight, top_left, top_right, bottom_left, bottom_right
    top_left, bottom_right
}

export class Vector {
    xDirection: number;
    yDirection: number;

    constructor(p1: LayoutPosition, p2: LayoutPosition) {
        this.xDirection = Math.sign(p2.x - p1.x);
        this.yDirection = Math.sign(p2.y - p1.y);
    }
}

interface Test {
    color?: string;
    backgroundColor?: string;
    border?: string;
}

type TestKey = keyof Test;

export function func<T extends CSSProperties>(property: T): T {
    const result = {} as T;

    // eslint-disable-next-line guard-for-in
    for (const some in property) {
        const key = some as keyof T;
        result[key] = property[key];
    }

    return result;
}

export function func1(property: CSSProperties | undefined): CSSProperties {
    const result = {} as CSSProperties;

    if (!property) {
        return {} as CSSProperties;
    }

    // eslint-disable-next-line guard-for-in
    for (const some in property) {
        const key = some as keyof CSSProperties;
        // @ts-ignore
        result[key] = property[key];
    }

    return result;
}

export function func2<T extends CSSProperties>(property: T | undefined): CSSProperties {
    const result = {} as CSSProperties;


    if (!property) {
        return {} as CSSProperties;
    }
    // eslint-disable-next-line guard-for-in
    for (const some in result) {
        const key = some as keyof CSSProperties;
        result[key] = property[key];
    }

    return result;
}

export function func4(property: CSSProperties | undefined): CSSProperties {
    const result = {} as CSSProperties;


    if (!property) {
        return {} as CSSProperties;
    }
    // eslint-disable-next-line guard-for-in
    for (const some in result) {
        const key = some as keyof CSSProperties;
        result[key] = property[key];
    }

    return result;
}

export class AbsoluteRectangle {
    p1: CanvasPosition;
    p2: CanvasPosition;

    constructor(p1: CanvasPosition, p2: CanvasPosition) {
        this.p1 = p1;
        this.p2 = p2;
    }

    // toStyle<T extends CSSProperties>(additionalCssProperties: T): CSSProperties {
    //     const top = CanvasPosition.topLeft(this.p1, this.p2).y;
    //     const left = CanvasPosition.topLeft(this.p1, this.p2).x;
    //     const width = Math.abs(this.p1.x - this.p2.x);
    //     const height = Math.abs(this.p1.y - this.p2.y);
    //     // const res: CSSProperties = {
    //     //     position: "absolute",
    //     //     top: top + "px",
    //     //     left: left + "px",
    //     //     width: width + "px",
    //     //     height: height + "px",
    //     // };
    //     // type type_CSSProperties = typeof CSSProperties;
    //     const res = {} as CSSProperties;
    //     if (additionalCssProperties) {
    //         for (const key in  additionalCssProperties) {
    //             let str = key as keyof CSSProperties;
    //             res[str] = additionalCssProperties[str];
    //         }
    //     }
    //     // if (additionalCssProperties) {
    //     //     for (let entry of additionalCssProperties.entries()) {
    //     //         let cssKey = entry[0] as keyof CSSProperties;
    //     //         res[cssKey] = entry[1];
    //     //     }
    //     // }
    //     res.position = "absolute";
    //     res.top = top + "px";
    //     res.left = left + "px";
    //     res.width = width + "px";
    //     res.height = height + "px";
    //     return res;
    // }

    thisIsMyNewMethod(): string {
        return "string";
    }

    toStyle(additionalCssProperties: CSSProperties | undefined = undefined): CSSProperties {
        const top = CanvasPosition.topLeft(this.p1, this.p2).y;
        const left = CanvasPosition.topLeft(this.p1, this.p2).x;
        const width = Math.abs(this.p1.x - this.p2.x);
        const height = Math.abs(this.p1.y - this.p2.y);
        // const res: CSSProperties = {
        //     position: "absolute",
        //     top: top + "px",
        //     left: left + "px",
        //     width: width + "px",
        //     height: height + "px",
        // };
        // type type_CSSProperties = typeof CSSProperties;
        const res: CSSProperties = {} as CSSProperties;
        if (additionalCssProperties) {
            for (const key in  additionalCssProperties) {
                let str: keyof CSSProperties = key as keyof CSSProperties;
                // @ts-ignore
                res[str] = additionalCssProperties[str];
            }
        }
        // if (additionalCssProperties) {
        //     for (let entry of additionalCssProperties.entries()) {
        //         let cssKey = entry[0] as keyof CSSProperties;
        //         res[cssKey] = entry[1];
        //     }
        // }
        res.position = "absolute";
        res.top = top + "px";
        res.left = left + "px";
        res.width = width + "px";
        res.height = height + "px";
        return res;
    }
}

export class RadiusPlacement {
    innerRadiusRectangle: AbsoluteRectangle;
    outerRadiusRectangle: AbsoluteRectangle;
    borderStyle: CSSProperties;

    constructor(innerRadiusRectangle: AbsoluteRectangle, outerRadiusRectangle: AbsoluteRectangle, borderStyle: CSSProperties) {
        this.innerRadiusRectangle = innerRadiusRectangle;
        this.outerRadiusRectangle = outerRadiusRectangle;
        this.borderStyle = borderStyle;
    }
}

export class RouteSegmentPlacement {
    main: AbsoluteRectangle;
    radius?: RadiusPlacement;

    constructor(p1: CanvasPosition, p2: CanvasPosition) {
        this.main = new AbsoluteRectangle(p1, p2);
    }

}

function mergeCssProperties(style1: CSSProperties, style2: CSSProperties): CSSProperties {
    const res: CSSProperties = {} as CSSProperties;
    for (const key in style1) {
        let str: keyof CSSProperties = key as keyof CSSProperties;
        // @ts-ignore
        res[str] = style1[str];
    }
    for (const key in style2) {
        let str: keyof CSSProperties = key as keyof CSSProperties;
        // @ts-ignore
        res[str] = style2[str];
    }

    return res;
}

export class RouteWireSegment extends React.Component<RouteWireSegmentProps> {

    private static minInnerRadius: number = 10;

    public override render(): JSX.Element {
        const {routeId, routeSegment, borderWidth} = this.props;

        const key: string = routeId + routeSegment.getP1() + routeSegment.getP2();

        const segmentPlacement: RouteSegmentPlacement = this.calculateRouteSegmentPlacement();

        const border: CSSProperties = {} as CSSProperties;
        border.border = borderWidth + "px solid " + (routeSegment.isVertical() ? "red" : "blue");

        let innerRadiusDiv: JSX.Element | undefined = undefined;
        let outerRadiusDiv: JSX.Element | undefined = undefined;

        const innerBorder: CSSProperties = {} as CSSProperties;
        innerBorder.borderWidth = borderWidth + "px";
        innerBorder.borderColor = "green";
        const outerBorder: CSSProperties = {} as CSSProperties;
        outerBorder.borderWidth = borderWidth + "px";
        outerBorder.borderColor = "black";

        if (segmentPlacement.radius) {
            innerRadiusDiv = <div key={key + "-inner-radius"}
                                  style={segmentPlacement.radius.innerRadiusRectangle.toStyle(mergeCssProperties(segmentPlacement.radius.borderStyle, innerBorder))}></div>;
            outerRadiusDiv = <div key={key + "-outer-radius"}
                                  style={segmentPlacement.radius.outerRadiusRectangle.toStyle(mergeCssProperties(segmentPlacement.radius.borderStyle, outerBorder))}></div>;
        }

        return (
            <div>
                <div key={key + "-main"} style={segmentPlacement.main.toStyle(border)}></div>
                {innerRadiusDiv}
                {outerRadiusDiv}
            </div>
        );
    }

    private calculateRouteSegmentPlacement(): RouteSegmentPlacement {

        const { routeSegment, cellSize, prevSegment, nextSegment } = this.props;

        const topLeft: LayoutPosition = routeSegment!.topLeft();
        const bottomRight: LayoutPosition = routeSegment!.bottomRight();

        const prevCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector} | undefined =
            this.calculateAdjacentSegmentRadiusDirection(routeSegment, prevSegment);
        const nextCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector} | undefined =
            this.calculateAdjacentSegmentRadiusDirection(routeSegment, nextSegment);

        const topLeftCanvas: CanvasPosition = topLeft.toCanvasPosition(cellSize);
        const bottomRightCanvas: CanvasPosition = bottomRight.toCanvasPosition(cellSize);

        if (routeSegment.isVertical()) {
            return this.calculateRouteSegmentPlacementForVertical(topLeftCanvas, bottomRightCanvas, prevCornerPlacement, nextCornerPlacement);
        } else {
            return this.calculateRouteSegmentPlacementForHorizontal(topLeftCanvas, bottomRightCanvas, prevCornerPlacement, nextCornerPlacement);
        }

    }

    private calculateRouteSegmentPlacementForVertical(topLeftCanvas: CanvasPosition,
                                                      bottomRightCanvas: CanvasPosition,
                                                      prevCornerPlacement?: {commonPointCorner: CornerMarker, adjacentVector: Vector},
                                                      nextCornerPlacement?: {commonPointCorner: CornerMarker, adjacentVector: Vector}): RouteSegmentPlacement {

        const { lineWidth, radius, borderWidth} = this.props;
        const halfLineWidth = lineWidth / 2;

        let placement: RouteSegmentPlacement = new RouteSegmentPlacement(
            new CanvasPosition(topLeftCanvas.x - halfLineWidth, topLeftCanvas.y - halfLineWidth),
            new CanvasPosition(bottomRightCanvas.x + halfLineWidth - borderWidth, bottomRightCanvas.y + halfLineWidth - borderWidth)
        );
        // placement.main.p1 = ;
        // placement.main.p2 = ;

        const innerRadius: number = Math.max(radius - lineWidth, RouteWireSegment.minInnerRadius);
        const outerRadius: number = Math.max(radius, lineWidth + RouteWireSegment.minInnerRadius);

        if (nextCornerPlacement) {
            if (nextCornerPlacement.commonPointCorner == CornerMarker.top_left) {
                placement.main.p1 = new CanvasPosition(placement.main.p1.x, placement.main.p1.y + outerRadius);
            } else {
                placement.main.p2 = new CanvasPosition(placement.main.p2.x, placement.main.p2.y - outerRadius);
            }
        }

        if (prevCornerPlacement) {

            if (prevCornerPlacement.commonPointCorner == CornerMarker.top_left) {
                placement.main.p1 = new CanvasPosition(placement.main.p1.x, placement.main.p1.y + outerRadius);
            } else {
                placement.main.p2 = new CanvasPosition(placement.main.p2.x, placement.main.p2.y - outerRadius);
            }

            const commonPoint: CanvasPosition = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? topLeftCanvas : bottomRightCanvas;
            const commonPointYDirection: number = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? 1 : -1;
            const adjacentVector: Vector = prevCornerPlacement.adjacentVector;

            const innerRadiusRectangleP1 = new CanvasPosition(
                commonPoint.x + adjacentVector.xDirection * halfLineWidth,
                commonPoint.y + commonPointYDirection * halfLineWidth);
            const innerRadiusRectangleP2 = new CanvasPosition(
                innerRadiusRectangleP1.x + adjacentVector.xDirection * innerRadius,
                innerRadiusRectangleP1.y + commonPointYDirection * innerRadius);

            const outerRadiusRectangleP1 = new CanvasPosition(
                commonPoint.x + -adjacentVector.xDirection * halfLineWidth,
                commonPoint.y + -commonPointYDirection * halfLineWidth);
            const outerRadiusRectangleP2 = new CanvasPosition(
                outerRadiusRectangleP1.x + adjacentVector.xDirection * outerRadius,
                outerRadiusRectangleP1.y + commonPointYDirection * outerRadius);

            const borderStyle: CSSProperties = this.calculateBorderStyle(adjacentVector.xDirection, commonPointYDirection);

            placement.radius = new RadiusPlacement(
                new AbsoluteRectangle(innerRadiusRectangleP1, innerRadiusRectangleP2),
                new AbsoluteRectangle(outerRadiusRectangleP1, outerRadiusRectangleP2),
                borderStyle);
        }

        return placement;

    }

    private calculateRouteSegmentPlacementForHorizontal(topLeftCanvas: CanvasPosition,
                                                        bottomRightCanvas: CanvasPosition,
                                                        prevCornerPlacement?: {commonPointCorner: CornerMarker, adjacentVector: Vector},
                                                        nextCornerPlacement?: {commonPointCorner: CornerMarker, adjacentVector: Vector}): RouteSegmentPlacement {

        const { lineWidth, radius, borderWidth} = this.props;
        const halfLineWidth = lineWidth / 2;

        let placement: RouteSegmentPlacement = new RouteSegmentPlacement(
            new CanvasPosition(topLeftCanvas.x - halfLineWidth, topLeftCanvas.y - halfLineWidth),
            new CanvasPosition(bottomRightCanvas.x + halfLineWidth - borderWidth, bottomRightCanvas.y + halfLineWidth - borderWidth)
        );
        // placement.main.p1 = ;
        // placement.main.p2 = ;

        const innerRadius: number = Math.max(radius - lineWidth, RouteWireSegment.minInnerRadius);
        const outerRadius: number = Math.max(radius, lineWidth + RouteWireSegment.minInnerRadius);

        if (nextCornerPlacement) {
            if (nextCornerPlacement.commonPointCorner == CornerMarker.top_left) {
                placement.main.p1 = new CanvasPosition(placement.main.p1.x + outerRadius, placement.main.p1.y);
            } else {
                placement.main.p2 = new CanvasPosition(placement.main.p2.x - outerRadius, placement.main.p2.y);
            }
        }

        if (prevCornerPlacement) {

            if (prevCornerPlacement.commonPointCorner == CornerMarker.top_left) {
                placement.main.p1 = new CanvasPosition(placement.main.p1.x + outerRadius, placement.main.p1.y);
            } else {
                placement.main.p2 = new CanvasPosition(placement.main.p2.x - outerRadius, placement.main.p1.y);
            }

            const commonPoint: CanvasPosition = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? topLeftCanvas : bottomRightCanvas;
            const commonPointXDirection: number = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? 1 : -1;
            const adjacentVector: Vector = prevCornerPlacement.adjacentVector;

            const innerRadiusRectangleP1 = new CanvasPosition(
                commonPoint.x + commonPointXDirection * halfLineWidth,
                commonPoint.y + adjacentVector.yDirection * halfLineWidth);
            const innerRadiusRectangleP2 = new CanvasPosition(
                innerRadiusRectangleP1.x + commonPointXDirection * innerRadius,
                innerRadiusRectangleP1.y + adjacentVector.yDirection * innerRadius);

            const outerRadiusRectangleP1 = new CanvasPosition(
                commonPoint.x + -commonPointXDirection * halfLineWidth,
                commonPoint.y + -adjacentVector.yDirection * halfLineWidth);
            const outerRadiusRectangleP2 = new CanvasPosition(
                outerRadiusRectangleP1.x + commonPointXDirection * outerRadius,
                outerRadiusRectangleP1.y + adjacentVector.yDirection * outerRadius);

            const borderStyle: CSSProperties = this.calculateBorderStyle(commonPointXDirection, adjacentVector.yDirection);

            placement.radius = new RadiusPlacement(
                new AbsoluteRectangle(innerRadiusRectangleP1, innerRadiusRectangleP2),
                new AbsoluteRectangle(outerRadiusRectangleP1, outerRadiusRectangleP2),
                borderStyle);

        }

        return placement;

    }

    private calculateAdjacentSegmentRadiusDirection(routeSegment: CellRouteSegment, adjacentSegment?: CellRouteSegment, ):
        {commonPointCorner: CornerMarker, adjacentVector: Vector} | undefined {

        if (!adjacentSegment) {
            return undefined;
        }

        let commonPoint: LayoutPosition, adjacentOtherPoint: LayoutPosition;
        let commonPointCornerMarker: CornerMarker;
        if (routeSegment.topLeft().equals(adjacentSegment.topLeft())) {
            commonPoint = adjacentSegment.topLeft();
            adjacentOtherPoint = adjacentSegment.bottomRight();
            commonPointCornerMarker = CornerMarker.top_left;
        } else if (routeSegment.topLeft().equals(adjacentSegment.bottomRight())) {
            commonPoint = adjacentSegment.bottomRight();
            adjacentOtherPoint = adjacentSegment.topLeft();
            commonPointCornerMarker = CornerMarker.top_left;
        } else if (routeSegment.bottomRight().equals(adjacentSegment.topLeft())) {
            commonPoint = adjacentSegment.topLeft();
            adjacentOtherPoint = adjacentSegment.bottomRight();
            commonPointCornerMarker = CornerMarker.bottom_right;
        } else if (routeSegment.bottomRight().equals(adjacentSegment.bottomRight())) {
            commonPoint = adjacentSegment.bottomRight();
            adjacentOtherPoint = adjacentSegment.topLeft();
            commonPointCornerMarker = CornerMarker.bottom_right;
        } else {
            throw new Error("cannot recognize " + routeSegment.topLeft() + " " + adjacentSegment.topLeft())
        }

        const adjacentVector: Vector = new Vector(commonPoint, adjacentOtherPoint);

        return {commonPointCorner: commonPointCornerMarker, adjacentVector: adjacentVector}

    }

    private calculateBorderStyle(xDirection: number, yDirection: number): CSSProperties {

        const style: CSSProperties = {} as CSSProperties/*new Map<string, string>()*/;

        if (xDirection < 0 && yDirection < 0) {
            // bottom_right
            style.borderStyle = "none solid solid none";
            style.borderRadius = "0 0 100% 0";
        } else if (xDirection < 0 && yDirection > 0) {
            // bottom_left
            style.borderStyle = "solid solid none none";
            style.borderRadius = "0 100% 0 0";
        } else if (xDirection > 0 && yDirection < 0) {
            // top_right
            style.borderStyle = "none none solid solid";
            style.borderRadius = "0 0 0 100%";
        } else if (xDirection > 0 && yDirection > 0) {
            // top_left
            style.borderStyle = "solid none none solid";
            style.borderRadius = "100% 0 0 0";
        }

        return style;
    }

}
