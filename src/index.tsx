import React from "react";
import * as ReactDOMClient from "react-dom/client";
import {BoxSize} from "./data/box-size";
import {CellRouteView} from "./family-tree-layout-editor/view/cell-route-view";
import {CellRoute} from "./data/cell-route";
import {LayoutPosition} from "./data/layout-position";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

const cellSize: BoxSize = new BoxSize(50, 50);

const route: CellRoute = new CellRoute([
    new LayoutPosition(0, 1),
    new LayoutPosition(1, 1),
    new LayoutPosition(1, 2),
    new LayoutPosition(2, 2),
    new LayoutPosition(2, 3),
    new LayoutPosition(3, 3),
    new LayoutPosition(3, 4),
    new LayoutPosition(5, 4),
    new LayoutPosition(5, 3),
    new LayoutPosition(6, 3),
    new LayoutPosition(6, 2),
]);

root.render(<CellRouteView cellSize={cellSize} layoutSizeX={10} layoutSizeY={10} route={route} />);
