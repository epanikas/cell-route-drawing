import React, {CSSProperties, JSX} from "react";
import {CellRouteSegment} from "../../../data/cell-route";
import {LayoutPosition} from "../../../data/layout-position";
import {CanvasPosition} from "../../../data/canvas-position";
import {BoxSize} from "../../../data/box-size";


export class RouteWireSegmentProps {
    routeId: string
    cellSize: BoxSize;
    routeSegment: CellRouteSegment;
    lineWidth: number;
    radius: number;
    color: string;
    prevSegment?: CellRouteSegment;
    nextSegment?: CellRouteSegment;
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

export class AbsoluteRectangle {
    p1: CanvasPosition;
    p2: CanvasPosition;

    toStyle(additionalCssProperties: Map<string, string> = undefined): CSSProperties {
        const top = CanvasPosition.topLeft(this.p1, this.p2).y;
        const left = CanvasPosition.topLeft(this.p1, this.p2).x;
        const width = Math.abs(this.p1.x - this.p2.x);
        const height = Math.abs(this.p1.y - this.p2.y);
        const res: CSSProperties = {
            position: "absolute",
            top: top + "px",
            left: left + "px",
            width: width + "px",
            height: height + "px",
        };
        if (additionalCssProperties) {
            for (let entry of additionalCssProperties.entries()) {
                res[entry[0]] = entry[1];
            }
        }
        return res;
    }
}

export class RadiusPlacement {
    innerRadiusRectangle: AbsoluteRectangle;
    outerRadiusRectangle: AbsoluteRectangle;
    borderStyle: Map<string, string>;
}

export class RouteSegmentPlacement {
    main: AbsoluteRectangle;
    radius: RadiusPlacement;

    constructor() {
        this.main = new AbsoluteRectangle();
    }

}

export class RouteWireSegment extends React.Component<RouteWireSegmentProps> {

    private static minInnerRadius: number = 10;

    public override render(): JSX.Element {
        const {routeId, routeSegment} = this.props;

        const key: string = routeId + routeSegment.getP1() + routeSegment.getP2();

        const segmentPlacement: RouteSegmentPlacement = this.calculateRouteSegmentPlacement();

        const border: Map<string, string> = new Map<string, string>();
        border.set("border", "1px solid " + (routeSegment.isVertical() ? "red" : "blue"));

        let innerRadiusDiv: JSX.Element, outerRadiusDiv: JSX.Element;

        if (segmentPlacement.radius) {
            const innerBorder: Map<string, string> = new Map(segmentPlacement.radius.borderStyle);
            innerBorder.set("borderWidth", "1px")
            innerBorder.set("borderColor", "green")
            const outerBorder: Map<string, string> = new Map(segmentPlacement.radius.borderStyle);
            outerBorder.set("borderWidth", "1px")
            outerBorder.set("borderColor", "black")
            innerRadiusDiv = <div key={key + "-inner-radius"} style={segmentPlacement.radius.innerRadiusRectangle.toStyle(innerBorder)}></div>;
            outerRadiusDiv = <div key={key + "-outer-radius"} style={segmentPlacement.radius.outerRadiusRectangle.toStyle(outerBorder)}></div>;
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

        const topLeft: LayoutPosition = routeSegment.topLeft();
        const bottomRight: LayoutPosition = routeSegment.bottomRight();

        const prevCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector} =
            this.calculateAdjacentSegmentRadiusDirection(prevSegment, routeSegment);
        const nextCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector} =
            this.calculateAdjacentSegmentRadiusDirection(nextSegment, routeSegment);

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
                                                      prevCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector},
                                                      nextCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector}): RouteSegmentPlacement {

        const { lineWidth, radius} = this.props;
        const halfLineWidth = lineWidth / 2;

        let placement: RouteSegmentPlacement = new RouteSegmentPlacement();
        placement.main.p1 = new CanvasPosition(topLeftCanvas.x - halfLineWidth, topLeftCanvas.y - halfLineWidth);
        placement.main.p2 = new CanvasPosition(bottomRightCanvas.x + halfLineWidth, bottomRightCanvas.y + halfLineWidth);

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

            placement.radius = {
                innerRadiusRectangle: new AbsoluteRectangle(),
                outerRadiusRectangle: new AbsoluteRectangle(),
                borderStyle: new Map<string, string>()
            };

            const commonPoint: CanvasPosition = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? topLeftCanvas : bottomRightCanvas;
            const commonPointYDirection: number = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? 1 : -1;
            const adjacentVector: Vector = prevCornerPlacement.adjacentVector;

            placement.radius.innerRadiusRectangle.p1 = new CanvasPosition(
                commonPoint.x + adjacentVector.xDirection * halfLineWidth,
                commonPoint.y + commonPointYDirection * halfLineWidth);
            placement.radius.innerRadiusRectangle.p2 = new CanvasPosition(
                placement.radius.innerRadiusRectangle.p1.x + adjacentVector.xDirection * innerRadius,
                placement.radius.innerRadiusRectangle.p1.y + commonPointYDirection * innerRadius);

            placement.radius.outerRadiusRectangle.p1 = new CanvasPosition(
                commonPoint.x + -adjacentVector.xDirection * halfLineWidth,
                commonPoint.y + -commonPointYDirection * halfLineWidth);
            placement.radius.outerRadiusRectangle.p2 = new CanvasPosition(
                placement.radius.outerRadiusRectangle.p1.x + adjacentVector.xDirection * outerRadius,
                placement.radius.outerRadiusRectangle.p1.y + commonPointYDirection * outerRadius);

            placement.radius.borderStyle = this.calculateBorderStyle(adjacentVector.xDirection, commonPointYDirection);

        }

        return placement;

    }

    private calculateRouteSegmentPlacementForHorizontal(topLeftCanvas: CanvasPosition,
                                                        bottomRightCanvas: CanvasPosition,
                                                        prevCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector},
                                                        nextCornerPlacement: {commonPointCorner: CornerMarker, adjacentVector: Vector}): RouteSegmentPlacement {

        const { lineWidth, radius} = this.props;
        const halfLineWidth = lineWidth / 2;

        let placement: RouteSegmentPlacement = new RouteSegmentPlacement();
        placement.main.p1 = new CanvasPosition(topLeftCanvas.x - halfLineWidth, topLeftCanvas.y - halfLineWidth);
        placement.main.p2 = new CanvasPosition(bottomRightCanvas.x + halfLineWidth, bottomRightCanvas.y + halfLineWidth);

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

            placement.radius = {
                innerRadiusRectangle: new AbsoluteRectangle(),
                outerRadiusRectangle: new AbsoluteRectangle(),
                borderStyle: new Map<string, string>()
            };

            const commonPoint: CanvasPosition = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? topLeftCanvas : bottomRightCanvas;
            const commonPointXDirection: number = prevCornerPlacement.commonPointCorner == CornerMarker.top_left ? 1 : -1;
            const adjacentVector: Vector = prevCornerPlacement.adjacentVector;

            placement.radius.innerRadiusRectangle.p1 = new CanvasPosition(
                commonPoint.x + commonPointXDirection * halfLineWidth,
                commonPoint.y + adjacentVector.yDirection * halfLineWidth);
            placement.radius.innerRadiusRectangle.p2 = new CanvasPosition(
                placement.radius.innerRadiusRectangle.p1.x + commonPointXDirection * innerRadius,
                placement.radius.innerRadiusRectangle.p1.y + adjacentVector.yDirection * innerRadius);

            placement.radius.outerRadiusRectangle.p1 = new CanvasPosition(
                commonPoint.x + -commonPointXDirection * halfLineWidth,
                commonPoint.y + -adjacentVector.yDirection * halfLineWidth);
            placement.radius.outerRadiusRectangle.p2 = new CanvasPosition(
                placement.radius.outerRadiusRectangle.p1.x + commonPointXDirection * outerRadius,
                placement.radius.outerRadiusRectangle.p1.y + adjacentVector.yDirection * outerRadius);

            placement.radius.borderStyle = this.calculateBorderStyle(commonPointXDirection, adjacentVector.yDirection);

        }

        return placement;

    }

    private calculateAdjacentSegmentRadiusDirection(adjacentSegment: CellRouteSegment, routeSegment: CellRouteSegment):
        {commonPointCorner: CornerMarker, adjacentVector: Vector} {

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
        }

        const adjacentVector: Vector = new Vector(commonPoint, adjacentOtherPoint);

        return {commonPointCorner: commonPointCornerMarker, adjacentVector: adjacentVector}

    }

    private calculateBorderStyle(xDirection: number, yDirection: number): Map<string, string> {

        const style: Map<string, string> = new Map<string, string>();

        if (xDirection < 0 && yDirection < 0) {
            // bottom_right
            style.set("borderStyle", "none solid solid none");
            style.set("borderRadius", "0 0 100% 0");
        } else if (xDirection < 0 && yDirection > 0) {
            // bottom_left
            style.set("borderStyle", "solid solid none none");
            style.set("borderRadius", "0 100% 0 0");
        } else if (xDirection > 0 && yDirection < 0) {
            // top_right
            style.set("borderStyle", "none none solid solid");
            style.set("borderRadius", "0 0 0 100%");
        } else if (xDirection > 0 && yDirection > 0) {
            // top_left
            style.set("borderStyle", "solid none none solid");
            style.set("borderRadius", "100% 0 0 0");
        }

        return style;
    }

}