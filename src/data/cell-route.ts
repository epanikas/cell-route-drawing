import {LayoutPosition} from "./layout-position";
import {CellRouteSegment} from "./cell-route-segment";


export class CellRoute {
    readonly cells: LayoutPosition[] = [];

    constructor(cells: LayoutPosition[]) {
        this.cells = cells;
    }

    public getRouteSegments(): CellRouteSegment[] {
        if (this.cells.length < 2) {
            return [];
        }
        const res: CellRouteSegment[] = [];
        let prev: LayoutPosition = this.cells[0];
        for (let i = 1; i < this.cells.length; ++i) {
            res.push(new CellRouteSegment(prev, this.cells[i]))
            prev = this.cells[i]
        }
        return res;
    }

    public toString(): string {
        return "route " + this.cells;
    }

    getCells(): LayoutPosition[] {
        return this.cells;
    }

}
