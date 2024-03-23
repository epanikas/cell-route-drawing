import React, {JSX} from "react";
import {BoxSize} from "../data/box-size";
import {Grid} from "./components/grid";
import {RouteWire} from "./components/route-wire";
import {CellRoute} from "../data/cell-route";

export class CellRouteViewProps {
    layoutSizeX: number = 10;
    layoutSizeY: number = 10;
    cellSize: BoxSize;
    route: CellRoute;

    constructor(cellSize: BoxSize, route: CellRoute) {
        this.cellSize = cellSize;
        this.route = route;
    }
}

export class CellRouteView extends React.Component<CellRouteViewProps> {


    override render(): JSX.Element {

        const { route, cellSize , layoutSizeX, layoutSizeY} = this.props;


        return (
            <div>
                <div style={{width: cellSize!.sizeX * layoutSizeX, height: cellSize!.sizeY * layoutSizeY, position: 'relative'}}>
                    <Grid layoutSizeX={layoutSizeX} layoutSizeY={layoutSizeY} cellSize={cellSize} />
                    <RouteWire cellSize={cellSize} route={route} color={"blue"} lineWidth={14} radius={30} borderWidth={4}/>
                </div>
            </div>
        );
    }

}