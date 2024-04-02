import React, {CSSProperties, JSX} from "react";
import {CanvasPosition} from "../../data/canvas-position";
import {BoxSize} from "../../data/box-size";
import {CellRouteSegment} from "../../data/cell-route-segment";
import {CanvasRectangle} from "../../data/canvas-rectangle";
import {CssPropertiesUtils} from "../../data/css-properties-utils";
import {CanvasCorner, CornerType} from "../../data/canvas-corner";


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

export class RouteWireSegment extends React.Component<RouteWireSegmentProps> {

    public override render(): JSX.Element {
        const {routeId, routeSegment, borderWidth, color, prevSegment} = this.props;

        const key: string = routeId + routeSegment.getP1() + routeSegment.getP2();

        const segmentRectangle: CanvasRectangle = this.calculateRouteCanvasRectangle();

        const borderCss: CSSProperties = this.segmentBorderCss(borderWidth, color);

        let radius: JSX.Element[] = this.getRadiusJsx(key);

        return (
            <div>
                <div key={key + "-main"}
                     style={CssPropertiesUtils.mergeCssProperties(segmentRectangle.toStyle(), borderCss)}/>
                {radius}
            </div>
        );
    }

    private calculateRouteCanvasRectangle(): CanvasRectangle {

        const {routeSegment, cellSize} = this.props;

        const topLeftCanvas: CanvasPosition = routeSegment.topLeft().toCanvasPosition(cellSize);
        const bottomRightCanvas: CanvasPosition = routeSegment.bottomRight().toCanvasPosition(cellSize);

        const topLeftAdjacent: CellRouteSegment | undefined = this.getTopLeftAdjacent();
        const bottomRightAdjacent: CellRouteSegment | undefined = this.getBottomRightAdjacent();

        if (routeSegment.isVertical()) {
            return this.calculateCanvasRectangleForVertical(topLeftCanvas, bottomRightCanvas,
                topLeftAdjacent != undefined, bottomRightAdjacent != undefined);
        } else {
            return this.calculateCanvasRectangleForHorizontal(topLeftCanvas, bottomRightCanvas,
                topLeftAdjacent != undefined, bottomRightAdjacent != undefined);
        }

    }

    private calculateCanvasRectangleForVertical(topLeftCanvas: CanvasPosition,
                                                bottomRightCanvas: CanvasPosition,
                                                hasTopLeftAdjacent: boolean,
                                                hasBottomRightAdjacent: boolean): CanvasRectangle {

        const {lineWidth, radius, borderWidth} = this.props;
        const halfLineWidth = lineWidth / 2;

        let mainTopLeft: CanvasPosition = new CanvasPosition(topLeftCanvas.x - halfLineWidth - borderWidth, topLeftCanvas.y - halfLineWidth);
        let mainBottomRight: CanvasPosition = new CanvasPosition(bottomRightCanvas.x + halfLineWidth - borderWidth, bottomRightCanvas.y + halfLineWidth);

        if (hasTopLeftAdjacent) {
            mainTopLeft = new CanvasPosition(mainTopLeft.x, mainTopLeft.y + radius + lineWidth + 2 * borderWidth);
        }

        if (hasBottomRightAdjacent) {
            mainBottomRight = new CanvasPosition(mainBottomRight.x, mainBottomRight.y - radius - lineWidth - 2 * borderWidth);
        }

        return new CanvasRectangle(mainTopLeft, mainBottomRight);
    }

    private calculateCanvasRectangleForHorizontal(topLeftCanvas: CanvasPosition,
                                                  bottomRightCanvas: CanvasPosition,
                                                  hasTopLeftAdjacent: boolean,
                                                  hasBottomRightAdjacent: boolean): CanvasRectangle {

        const {lineWidth, radius, borderWidth} = this.props;
        const halfLineWidth = lineWidth / 2;

        let mainTopLeft: CanvasPosition = new CanvasPosition(topLeftCanvas.x - halfLineWidth, topLeftCanvas.y - halfLineWidth - borderWidth);
        let mainBottomRight: CanvasPosition = new CanvasPosition(bottomRightCanvas.x + halfLineWidth, bottomRightCanvas.y + halfLineWidth - borderWidth);

        if (hasTopLeftAdjacent) {
            mainTopLeft = new CanvasPosition(mainTopLeft.x + radius + lineWidth + 2*borderWidth, mainTopLeft.y);
        }

        if (hasBottomRightAdjacent) {
            mainBottomRight = new CanvasPosition(mainBottomRight.x - radius - lineWidth - 2*borderWidth, mainBottomRight.y);
        }

        return new CanvasRectangle(mainTopLeft, mainBottomRight);
    }

    private segmentBorderCss(borderWidth: number, color: string): CSSProperties {

        const { routeSegment } = this.props;

        const border: CSSProperties = {} as CSSProperties;
        border.borderTopWidth = routeSegment.isVertical() ? "0" : borderWidth + "px";
        border.borderBottomWidth = routeSegment.isVertical() ? "0" : borderWidth + "px";
        border.borderLeftWidth = routeSegment.isVertical() ? borderWidth + "px" : "0";
        border.borderRightWidth = routeSegment.isVertical() ? borderWidth + "px" : "0";
        border.color = color;
        border.borderTopStyle = routeSegment.isVertical() ? "none" : "solid";
        border.borderBottomStyle = routeSegment.isVertical() ? "none" : "solid";
        border.borderLeftStyle = routeSegment.isVertical() ? "solid" : "none";
        border.borderRightStyle = routeSegment.isVertical() ? "solid" : "none";

        return border;

    }

    private getTopLeftAdjacent(): CellRouteSegment | undefined {
        const { prevSegment, nextSegment, routeSegment} = this.props;

        if (nextSegment && (
            routeSegment.topLeft().equals(nextSegment.topLeft()) ||
            routeSegment.topLeft().equals(nextSegment.bottomRight()))) {
            return nextSegment;
        }

        if (prevSegment && (
            routeSegment.topLeft().equals(prevSegment.topLeft()) ||
            routeSegment.topLeft().equals(prevSegment.bottomRight()))) {
            return prevSegment;
        }

        return undefined;
    }

    private getBottomRightAdjacent(): CellRouteSegment | undefined {
        const { prevSegment, nextSegment, routeSegment} = this.props;

        if (nextSegment && (
            routeSegment.bottomRight().equals(nextSegment.topLeft()) ||
            routeSegment.bottomRight().equals(nextSegment.bottomRight()))) {
            return nextSegment;
        }

        if (prevSegment && (
            routeSegment.bottomRight().equals(prevSegment.topLeft()) ||
            routeSegment.bottomRight().equals(prevSegment.bottomRight()))) {
            return prevSegment;
        }

        return undefined;
    }

    private getCornerPoint(routeSegment: CellRouteSegment, prevSegment: CellRouteSegment): CanvasCorner {

        const { cellSize } = this.props;

        if (routeSegment.isVertical()) {

            if (routeSegment.topLeft().equals(prevSegment.topLeft())) {
                return new CanvasCorner(routeSegment.topLeft().toCanvasPosition(cellSize), CornerType.topLeft);
            } else if (routeSegment.topLeft().equals(prevSegment.bottomRight())) {
                return new CanvasCorner(routeSegment.topLeft().toCanvasPosition(cellSize), CornerType.topRight);
            } else if (routeSegment.bottomRight().equals(prevSegment.topLeft())) {
                return new CanvasCorner(routeSegment.bottomRight().toCanvasPosition(cellSize), CornerType.bottomLeft);
            } else if (routeSegment.bottomRight().equals(prevSegment.bottomRight())) {
                return new CanvasCorner(routeSegment.bottomRight().toCanvasPosition(cellSize), CornerType.bottomRight);
            }
        } else {
            if (routeSegment.topLeft().equals(prevSegment.topLeft())) {
                return new CanvasCorner(routeSegment.topLeft().toCanvasPosition(cellSize), CornerType.topLeft);
            } else if (routeSegment.topLeft().equals(prevSegment.bottomRight())) {
                return new CanvasCorner(routeSegment.topLeft().toCanvasPosition(cellSize), CornerType.bottomLeft);
            } else if (routeSegment.bottomRight().equals(prevSegment.topLeft())) {
                return new CanvasCorner(routeSegment.bottomRight().toCanvasPosition(cellSize), CornerType.topRight);
            } else if (routeSegment.bottomRight().equals(prevSegment.bottomRight())) {
                return new CanvasCorner(routeSegment.bottomRight().toCanvasPosition(cellSize), CornerType.bottomRight);
            }
        }

        throw new Error("can't calculate corner point for " + routeSegment + " and " + prevSegment);
    }

    private getRadiusJsx(key: string): JSX.Element[] {

        const {prevSegment, routeSegment, borderWidth} = this.props;

        if (!prevSegment) {
            return []
        }
        const canvasCorner: CanvasCorner = this.getCornerPoint(routeSegment, prevSegment);
        const {radius, lineWidth} = this.props;
        const halfLineWidth = lineWidth / 2.;
        const cornerSide = halfLineWidth + radius + borderWidth;
        const innerRectSide: number = radius + borderWidth;
        const outerRectSide: number = innerRectSide + lineWidth + borderWidth;

        console.log("canvas corner " + canvasCorner.corner + ", " + canvasCorner.xDirection + ", " + canvasCorner.yDirection)

        const innerCornerPoint: CanvasPosition = new CanvasPosition(
            canvasCorner.point.x + (canvasCorner.xDirection < 0 ? -(cornerSide + borderWidth) : cornerSide),
            canvasCorner.point.y + (canvasCorner.yDirection < 0 ? -(cornerSide + borderWidth) : cornerSide));

        const innerRectangle: CanvasRectangle = new CanvasRectangle(
            innerCornerPoint, new CanvasPosition(
                innerCornerPoint.x + -1 * canvasCorner.xDirection * innerRectSide,
                innerCornerPoint.y + -1 * canvasCorner.yDirection * innerRectSide)
        );

        const outerRectangle: CanvasRectangle = new CanvasRectangle(
            innerCornerPoint, new CanvasPosition(
                innerCornerPoint.x + -1 * canvasCorner.xDirection * outerRectSide,
                innerCornerPoint.y + -1 * canvasCorner.yDirection * outerRectSide)
        );

        const innerBorderCss: CSSProperties = {} as CSSProperties;
        innerBorderCss.borderWidth = borderWidth + "px";
        innerBorderCss.borderColor = "rgb(255, 0, 0, 0.5)";
        innerBorderCss.borderStyle = this.getBorderStyle(canvasCorner.corner);
        innerBorderCss.borderRadius = this.getBorderRadius(canvasCorner.corner);

        const innerRadius: JSX.Element = <div key={key + "-inner-radius"}
                           style={CssPropertiesUtils.mergeCssProperties(innerRectangle.toStyle(), innerBorderCss)}/>

        const outerBorderCss: CSSProperties = {} as CSSProperties;
        outerBorderCss.borderWidth = borderWidth + "px";
        outerBorderCss.borderColor = "rgb(0, 0, 255, 0.5)";
        outerBorderCss.borderStyle = this.getBorderStyle(canvasCorner.corner);
        outerBorderCss.borderRadius = this.getBorderRadius(canvasCorner.corner);

        const outerRadius: JSX.Element = <div key={key + "-outer-radius"}
                           style={CssPropertiesUtils.mergeCssProperties(outerRectangle.toStyle(), outerBorderCss)}/>

        return [innerRadius, outerRadius];
    }

    getBorderStyle(cornerType: CornerType): string {

        switch (cornerType) {
            case CornerType.topLeft:
                return "solid none none solid";
            case CornerType.topRight:
                return "solid solid none none";
            case CornerType.bottomLeft:
                return "none none solid solid";
            case CornerType.bottomRight:
                return "none solid solid none";
        }

    }

    private getBorderRadius(cornerType: CornerType): import("csstype").Property.BorderRadius {

        switch (cornerType) {
            case CornerType.topLeft:
                return "100% 0 0 0";
            case CornerType.topRight:
                return "0 100% 0 0";
            case CornerType.bottomLeft:
                return "0 0 0 100%";
            case CornerType.bottomRight:
                return "0 0 100% 0";
        }
    }
}
