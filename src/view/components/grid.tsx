import React, {JSX} from "react";
import {BoxSize} from "../../data/box-size";

export class GridProps {

    layoutSizeX: number = 0;
    layoutSizeY: number = 0;
    cellSize?: BoxSize;

}

export class Grid extends React.Component<GridProps> {

    public override render(): JSX.Element {

        const {layoutSizeX, layoutSizeY, cellSize} = this.props


        let cells: JSX.Element[] = [];
        for (let i: number = 0; i < layoutSizeX; ++i) {
            for (let j: number = 0; j < layoutSizeY; ++j) {
                const left: number = i * cellSize!.sizeX;
                const top: number = j * cellSize!.sizeY;
                cells.push(
                    <div key={"grid-cell-" + i + "-" + j}
                         style={{
                             position: "absolute",
                             top: top + "px",
                             left: left + "px",
                             width: cellSize!.sizeX + "px",
                             height: cellSize!.sizeY + "px",
                             borderTop: "1px solid lightgrey",
                             borderLeft: i == 0 ? "1px solid lightgrey" : "none",
                             borderRight: "1px solid lightgrey",
                             borderBottom: j == layoutSizeY - 1  ? "1px solid lightgrey" : "none",
                         }}
                    ></div>
                );
            }
        }

        return <div>{cells}</div>;
    }

}