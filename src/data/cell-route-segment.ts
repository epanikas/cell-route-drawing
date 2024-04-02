import {LayoutPosition} from "./layout-position";

export class CellRouteSegment {
    private readonly p1: LayoutPosition;
    private readonly p2: LayoutPosition;
    private readonly vertical: boolean;

    public constructor(p1: LayoutPosition, p2: LayoutPosition) {
        this.p1 = p1;
        this.p2 = p2;

        if (p1.x != p2.x && p1.y != p2.y) {
            throw new Error("wrong segment: " + p1 + ": " + p2)
        }

        if (p1.x == p2.x && p1.y == p2.y) {
            throw new Error("degenerated segment: " + p1 + ": " + p2)
        }

        this.vertical = p1.x == p2.x
    }

    getP1(): LayoutPosition {
        return this.p1;
    }

    getP2(): LayoutPosition {
        return this.p2;
    }

    isVertical(): boolean {
        return this.vertical;
    }

    toString(): string {
        return "<" + this.p1 + "-" + this.p2 + ">"
    }

    public topLeft(): LayoutPosition {
        return LayoutPosition.topLeft(this.p1, this.p2);
    }

    public bottomRight(): LayoutPosition {
        return LayoutPosition.bottomRight(this.p1, this.p2);
    }

}
