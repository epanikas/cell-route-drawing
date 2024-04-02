import React, {CSSProperties, JSX} from "react";
import {LayoutPosition} from "../../data/layout-position";
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

        return <div
            key={key + "-main"}
            style={CssPropertiesUtils.mergeCssProperties(segmentRectangle.toStyle(), border)}/>;
    }

    private calculateRouteCanvasRectangle(): CanvasRectangle {

        const {routeSegment, cellSize} = this.props;

        const topLeftCanvas: CanvasPosition = routeSegment.topLeft().toCanvasPosition(cellSize);
        const bottomRightCanvas: CanvasPosition = routeSegment.bottomRight().toCanvasPosition(cellSize);

        if (routeSegment.isVertical()) {
            return this.calculateCanvasRectangleForVertical(topLeftCanvas, bottomRightCanvas);
        } else {
            return this.calculateCanvasRectangleForHorizontal(topLeftCanvas, bottomRightCanvas);
        }

    }

    private calculateCanvasRectangleForVertical(topLeftCanvas: CanvasPosition,
                                                bottomRightCanvas: CanvasPosition): CanvasRectangle {

        const {lineWidth, radius, borderWidth} = this.props;
        const halfLineWidth = lineWidth / 2;

        return new CanvasRectangle(
            new CanvasPosition(topLeftCanvas.x - halfLineWidth - borderWidth, topLeftCanvas.y - halfLineWidth),
            new CanvasPosition(bottomRightCanvas.x + halfLineWidth - borderWidth, bottomRightCanvas.y + halfLineWidth)
        );
    }

    private calculateCanvasRectangleForHorizontal(topLeftCanvas: CanvasPosition,
                                                  bottomRightCanvas: CanvasPosition): CanvasRectangle {

        const {lineWidth, radius, borderWidth} = this.props;
        const halfLineWidth = lineWidth / 2;

        return new CanvasRectangle(
            new CanvasPosition(topLeftCanvas.x - halfLineWidth, topLeftCanvas.y - halfLineWidth - borderWidth),
            new CanvasPosition(bottomRightCanvas.x + halfLineWidth, bottomRightCanvas.y + halfLineWidth - borderWidth)
        );
    }

}
