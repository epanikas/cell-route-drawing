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

const layoutSizeX: number = 11;
const layoutSizeY: number = 5;


const route1: CellRoute = new CellRoute([
    new LayoutPosition(0, 0),
    new LayoutPosition(3, 0),
    new LayoutPosition(3, 1),
    new LayoutPosition(1, 1),
    new LayoutPosition(1, 3),
    new LayoutPosition(6, 3),
    new LayoutPosition(6, 0),
    new LayoutPosition(8, 0),
    new LayoutPosition(8, 2),
    new LayoutPosition(10, 2),
    new LayoutPosition(10, 0),
]);

function mirrorRoute(route: CellRoute): CellRoute {

    const cells: LayoutPosition[] = [];

    route.getCells().forEach(cell => {
        cells.push(new LayoutPosition(layoutSizeX - cell.x - 1, layoutSizeY - cell.y - 1))
    })

    return new CellRoute(cells);

}

const route2 = mirrorRoute(route1);

// const route2: CellRoute = new CellRoute([
//     new LayoutPosition(10-0, 4-0),
//     new LayoutPosition(10-3, 4-0),
//     new LayoutPosition(10-3, 4-2),
//     new LayoutPosition(10-1, 4-2),
//     new LayoutPosition(10-1, 4-4),
//     new LayoutPosition(10-6, 4-4),
//     new LayoutPosition(10-6, 4-2),
//     new LayoutPosition(10-7, 4-2),
//     new LayoutPosition(10-7, 4-4),
//     new LayoutPosition(10-8, 4-4),
//     new LayoutPosition(10-8, 4-1),
//     new LayoutPosition(10-10, 4-1),
//     new LayoutPosition(10-10, 4-4),
// ]);

// const route2: CellRoute = new CellRoute([
//     new LayoutPosition(0, 4),
//     new LayoutPosition(0, 1),
//     new LayoutPosition(2, 1),
//     new LayoutPosition(2, 3),
//     new LayoutPosition(4, 3),
//     new LayoutPosition(4, 0),
//     // new LayoutPosition(4, 1),
//     // new LayoutPosition(4, 0),
//     new LayoutPosition(6, 0),
//     new LayoutPosition(6, 1),
//     new LayoutPosition(7, 1),
//     new LayoutPosition(7, 0),
//     new LayoutPosition(10, 0),
// ]);



export class CellRouteView extends React.Component<CellRouteViewProps> {


    override render(): JSX.Element {

        const { cellSize } = this.props;

        const containerCss: CSSProperties = {} as CSSProperties;
        containerCss.width = cellSize.sizeX * layoutSizeX;
        containerCss.height = cellSize.sizeY * layoutSizeY;
        containerCss.position = 'relative';

        const backgroundCss: CSSProperties = {} as CSSProperties;
        backgroundCss.position = "absolute";
        backgroundCss.top = "0";
        backgroundCss.left = "0";
        backgroundCss.width = "100%";
        backgroundCss.height = "100%";
        backgroundCss.backgroundImage = "url(/static/images/avatar/abstract-science-fiction-futuristic-space-with-blue-neon-lights.jpg)";
        backgroundCss.backgroundRepeat = "no-repeat";
        backgroundCss.backgroundSize = "cover";
        backgroundCss.backgroundPosition = "center";
        // backgroundCss.opacity = "0.8";

        return (
            <div>
                <div style={containerCss}>
                    <div style={backgroundCss} />
                    <Grid layoutSizeX={layoutSizeX} layoutSizeY={layoutSizeY} cellSize={cellSize} />
                    <RouteWire cellSize={cellSize} route={route1} color={"rgba(255, 217, 96, 1)"} lineWidth={20} radius={30} borderWidth={10}/>
                    <RouteWire cellSize={cellSize} route={route2} color={"rgba(215, 242, 255, 1)"} lineWidth={20} radius={30} borderWidth={10}/>
                    {/*<RouteWire cellSize={cellSize} route={route1} color={"rgba(255, 0, 0, 0.5)"} lineWidth={30} radius={30} borderWidth={20}/>*/}
                    {/*<RouteWire cellSize={cellSize} route={route2} color={"rgba(0, 255, 0, 0.5)"} lineWidth={30} radius={30} borderWidth={20}/>*/}
                    <GridCard gridPos={new LayoutPosition(0, 0)} cellSize={cellSize} imagePath={"avatar/mouse-square1.jpg"} />
                    <GridCard gridPos={new LayoutPosition(10, 4)} cellSize={cellSize} imagePath={"avatar/bee-square1.jpg"}/>
                    <GridCard gridPos={new LayoutPosition(10, 0)} cellSize={cellSize} imagePath={"avatar/cheese-square1.jpg"}/>
                    <GridCard gridPos={new LayoutPosition(0, 4)} cellSize={cellSize} imagePath={"avatar/honey-square1.jpg"}/>
                </div>
            </div>
        );
    }

}