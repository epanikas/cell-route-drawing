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

export class CellRoute {
  readonly cells: LayoutPosition[] = [];

  constructor(cells: LayoutPosition[]) {
    this.cells = cells;
  }


  public cloneRoute(): CellRoute {
    return new CellRoute(this.cells);
  }

  public addPoint(point: LayoutPosition): void {
    this.cells.push(point);
  }

  public addPoints(points: LayoutPosition[]): void {
    points.forEach(p => this.addPoint(p));
  }

  public addPointsFromRoute(route: CellRoute): void {
    this.addPoints(route.cells);
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

  public validate(): CellRoute {
    const segments = this.getRouteSegments();
    return this;
  }

  getCells(): LayoutPosition[] {
    return this.cells;
  }

  getRouteStartPosition(): LayoutPosition {
    return this.cells[0];
  }

  getRouteEndPosition(): LayoutPosition {
    return this.cells[this.cells.length - 1];
  }


}
