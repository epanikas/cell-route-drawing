import React, {JSX} from "react";
import {BoxSize} from "../../data/box-size";
import {RouteWireSegment} from "./route-wire-segment";
import {CellRoute} from "../../data/cell-route";
import {CellRouteSegment} from "../../data/cell-route-segment";


export class RouteProps {
    cellSize: BoxSize;
    route: CellRoute;
    color: string;
    lineWidth: number;
    radius: number;
    borderWidth: number;

    constructor(cellSize: BoxSize, route: CellRoute, color: string = "red", lineWidth: number = 5, radius: number = 10, borderWidth: number = 2) {
        this.cellSize = cellSize;
        this.route = route;
        this.color = color;
        this.lineWidth = lineWidth;
        this.radius = radius;
        this.borderWidth = borderWidth;
    }
}

export class RouteWire extends React.Component<RouteProps> {


    public override render(): JSX.Element {

        const {route, color, cellSize, lineWidth, radius, borderWidth} = this.props;

        const routeId = "route-";


        const segments: CellRouteSegment[] = route!.getRouteSegments();
        const drawnSegments: JSX.Element[] = [];
        for (var i: number = 0; i < segments.length; ++i) {

            const rs: CellRouteSegment = segments[i];
            const key = routeId + i + "-segment";

            drawnSegments.push(<RouteWireSegment key={key}
                                                 routeId={routeId}
                                                 cellSize={cellSize}
                                                 routeSegment={rs}
                                                 color={color}
                                                 lineWidth={lineWidth}
                                                 borderWidth={borderWidth}
                                                 radius={radius}
                                                 prevSegment={i > 0 ? segments[i - 1] : undefined}
                                                 nextSegment={i < segments.length - 1 ? segments[i + 1] : undefined}
            />);

        }

        return <div key={routeId}>{drawnSegments}</div>
    }

}