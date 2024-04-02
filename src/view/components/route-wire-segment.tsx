import React, {CSSProperties, JSX} from "react";
import {CanvasPosition} from "../../data/canvas-position";
import {BoxSize} from "../../data/box-size";
import {CellRouteSegment} from "../../data/cell-route-segment";
import {CanvasRectangle} from "../../data/canvas-rectangle";
import {CssPropertiesUtils} from "../../data/css-properties-utils";


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
        const {routeId, routeSegment, borderWidth, color} = this.props;

        const key: string = routeId + routeSegment.getP1() + routeSegment.getP2();

        const segmentRectangle: CanvasRectangle = this.calculateRouteCanvasRectangle();

        const borderCss: CSSProperties = this.segmentBorderCss(borderWidth, color);

        return <div key={key + "-main"} style={CssPropertiesUtils.mergeCssProperties(segmentRectangle.toStyle(), borderCss)}/>;
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
            mainTopLeft = new CanvasPosition(mainTopLeft.x, mainTopLeft.y + radius + lineWidth + borderWidth);
        }

        if (hasBottomRightAdjacent) {
            mainBottomRight = new CanvasPosition(mainBottomRight.x, mainBottomRight.y - radius - lineWidth - borderWidth);
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
            mainTopLeft = new CanvasPosition(mainTopLeft.x + radius + lineWidth + borderWidth, mainTopLeft.y);
        }

        if (hasBottomRightAdjacent) {
            mainBottomRight = new CanvasPosition(mainBottomRight.x - radius - lineWidth - borderWidth, mainBottomRight.y);
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
}
