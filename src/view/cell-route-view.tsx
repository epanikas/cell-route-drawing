import React, {JSX} from "react";
import {BoxSize} from "../data/box-size";
import {Grid} from "./components/grid";
import {RouteWire} from "./components/route-wire";
import {CellRoute} from "../data/cell-route";
import {GridCard} from "./components/grid-card";
import {LayoutPosition} from "../data/layout-position";

export class CellRouteViewProps {
    cellSize: BoxSize;

    constructor(cellSize: BoxSize) {
        this.cellSize = cellSize;
    }
}

const route1: CellRoute = new CellRoute([
    new LayoutPosition(0, 0),
    new LayoutPosition(3, 0),
    new LayoutPosition(3, 2),
    new LayoutPosition(1, 2),
    new LayoutPosition(1, 4),
    new LayoutPosition(6, 4),
    new LayoutPosition(6, 2),
    new LayoutPosition(7, 2),
    new LayoutPosition(7, 4),
    new LayoutPosition(8, 4),
    new LayoutPosition(8, 1),
    new LayoutPosition(9, 1),
    new LayoutPosition(9, 4),
]);

const route2: CellRoute = new CellRoute([
    new LayoutPosition(0, 4),
    new LayoutPosition(0, 1),
    new LayoutPosition(2, 1),
    new LayoutPosition(2, 3),
    new LayoutPosition(5, 3),
    new LayoutPosition(5, 1),
    new LayoutPosition(4, 1),
    new LayoutPosition(4, 0),
    new LayoutPosition(6, 0),
    new LayoutPosition(6, 1),
    new LayoutPosition(7, 1),
    new LayoutPosition(7, 0),
    new LayoutPosition(9, 0),
]);



export class CellRouteView extends React.Component<CellRouteViewProps> {


    override render(): JSX.Element {

        const layoutSizeX: number = 10;
        const layoutSizeY: number = 5;

        const { cellSize } = this.props;


        return (
            <div>
                <div style={{width: cellSize.sizeX * layoutSizeX, height: cellSize.sizeY * layoutSizeY, position: 'relative', backgroundImage: "url(/static/images/avatar/abstract-science-fiction-futuristic-space-with-blue-neon-lights.jpg)"}}>
                    <Grid layoutSizeX={layoutSizeX} layoutSizeY={layoutSizeY} cellSize={cellSize} />
                    {/*<RouteWire cellSize={cellSize} route={route1} color={"#ff7f7f"} lineWidth={30} radius={30} borderWidth={6}/>*/}
                    {/*<RouteWire cellSize={cellSize} route={route2} color={"#7fff7f"} lineWidth={30} radius={30} borderWidth={6}/>*/}
                    <RouteWire cellSize={cellSize} route={route1} color={"rgba(255, 0, 0, 1)"} lineWidth={30} radius={30} borderWidth={10}/>
                    <RouteWire cellSize={cellSize} route={route2} color={"rgba(0, 255, 0, 1)"} lineWidth={30} radius={30} borderWidth={10}/>
                    <GridCard gridPos={new LayoutPosition(0, 0)} cellSize={cellSize} imagePath={"avatar/mouse-square1.jpg"} />
                    <GridCard gridPos={new LayoutPosition(9, 4)} cellSize={cellSize} imagePath={"avatar/cheese-square1.jpg"}/>
                    <GridCard gridPos={new LayoutPosition(0, 4)} cellSize={cellSize} imagePath={"avatar/honey-square1.jpg"}/>
                    <GridCard gridPos={new LayoutPosition(9, 0)} cellSize={cellSize} imagePath={"avatar/bee-square1.jpg"}/>
                </div>
            </div>
        );
    }

}