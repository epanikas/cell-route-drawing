import React from "react";
import * as ReactDOMClient from "react-dom/client";
import {BoxSize} from "./data/box-size";
import {CellRouteView} from "./view/cell-route-view";
import {CellRoute} from "./data/cell-route";
import {LayoutPosition} from "./data/layout-position";

const container = document.getElementById("root");

if (container == null) {
    throw new Error("not found container");
}

const root = ReactDOMClient.createRoot(container);

const cellSize: BoxSize = new BoxSize(100, 100);

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

const route1: CellRoute = new CellRoute([
    new LayoutPosition(0, 0),
    new LayoutPosition(9, 0),
    new LayoutPosition(9, 4),
    new LayoutPosition(8, 4),
    new LayoutPosition(8, 1),
    new LayoutPosition(7, 1),
    new LayoutPosition(7, 4),
    new LayoutPosition(6, 4),
    new LayoutPosition(6, 1),
    new LayoutPosition(5, 1),
    new LayoutPosition(5, 4),
    new LayoutPosition(4, 4),
    new LayoutPosition(4, 1),
    new LayoutPosition(3, 1),
    new LayoutPosition(3, 4),
    new LayoutPosition(2, 4),
    new LayoutPosition(2, 1),
    new LayoutPosition(1, 1),
    new LayoutPosition(1, 4),
    new LayoutPosition(0, 4),
    new LayoutPosition(0, 1),
]);

root.render(<CellRouteView cellSize={cellSize} />);
