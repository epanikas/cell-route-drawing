import React, {CSSProperties, JSX} from "react";
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

const layoutSizeX: number = 5;
const layoutSizeY: number = 5;


const route: CellRoute = new CellRoute([
    new LayoutPosition(0, 0),
    new LayoutPosition(3, 0),
    new LayoutPosition(3, 2),
    new LayoutPosition(1, 2),
    new LayoutPosition(1, 4),
    new LayoutPosition(4, 4),
]);

export class CellRouteView extends React.Component<CellRouteViewProps> {

    override render(): JSX.Element {

        const {cellSize} = this.props;

        const containerCss: CSSProperties = {} as CSSProperties;
        containerCss.width = cellSize.sizeX * layoutSizeX;
        containerCss.height = cellSize.sizeY * layoutSizeY;
        containerCss.position = 'relative';

        return (
            <div>
                <div style={containerCss}>
                    <Grid layoutSizeX={layoutSizeX} layoutSizeY={layoutSizeY} cellSize={cellSize}/>
                    <RouteWire cellSize={cellSize} route={route} color={"rgba(114, 217, 96, 0.5)"} lineWidth={20} radius={0} borderWidth={10}/>
                    <GridCard gridPos={new LayoutPosition(0, 0)} cellSize={cellSize} imagePath={"avatar/mouse-square1.jpg"}/>
                    <GridCard gridPos={new LayoutPosition(4, 4)} cellSize={cellSize} imagePath={"avatar/cheese-square1.jpg"}/>
                </div>
            </div>
        );
    }

}