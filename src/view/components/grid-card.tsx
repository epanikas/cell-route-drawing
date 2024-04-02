import React, {CSSProperties, JSX} from "react";
import {LayoutPosition} from "../../data/layout-position";
import {BoxSize} from "../../data/box-size";
import {Avatar} from "@mui/material";


export class GridCardProperties {
    gridPos: LayoutPosition;
    cellSize: BoxSize;
    imagePath: string;

    constructor(gridPos: LayoutPosition, cellSize: BoxSize, imagePath: string) {
        this.gridPos = gridPos;
        this.cellSize = cellSize;
        this.imagePath = imagePath;
    }
}

export class GridCard extends React.Component<GridCardProperties> {

    public override render(): JSX.Element {

        const {gridPos, cellSize, imagePath} = this.props;

        const canvasPosition = gridPos.toCanvasPosition(cellSize, new LayoutPosition(0, 0));

        const cardStyle: CSSProperties = {} as CSSProperties;
        cardStyle.position = "absolute";
        cardStyle.top = canvasPosition.y + 1 + "px";
        cardStyle.left = canvasPosition.x + 1 + "px";
        cardStyle.width = cellSize.sizeX - 1 + "px";
        cardStyle.height = cellSize.sizeY - 1 + "px";
        cardStyle.borderRadius = "10px";

        return <Avatar style={cardStyle} src={"/static/images/" + imagePath}/>;

    }

}