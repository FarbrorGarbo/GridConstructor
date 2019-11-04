import GCEngine, {Vec, Point} from "./GCEngine";

export default class SelectedPoint {
    private _selectedPointId: string | null;
    private _selectedPoint: Vec | null;

    constructor(selectionPos: Point) {
        this._selectedPointId = null;
        this._selectedPoint = null;
        const settings = GCEngine.getSettings();
        Object.keys(GCEngine.drawing.points).forEach((key: string) => {
            const vector = GCEngine.drawing.points[key];
            const pos = GCEngine.project(settings, vector, true);
            const deltaH = selectionPos.h - pos.h;
            const deltaV = GCEngine.heightOfDrawing - selectionPos.v - pos.v;
            const distance = Math.sqrt(deltaH * deltaH + deltaV * deltaV);
            if (distance < 7) {
                this._selectedPointId = key;
                this._selectedPoint = GCEngine.drawing.points[key];
            }
        });
    }

    public get id() {
        return this._selectedPointId;
    }

    public get point() {
        return this._selectedPoint;
    }
}