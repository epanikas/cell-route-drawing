import {SyncRoutingEngine} from "../../sync-routing-engine";
import {LayoutPosition} from "../../../data/layout-position";
import {CellRoute} from "../../../data/cell-route";

export class RecursiveSyncRoutingEngine implements SyncRoutingEngine {

    calculateRoutes(startPos: LayoutPosition, endPos: LayoutPosition): CellRoute[] {
        return [];
    }



}