import React from "react";
import GCEngine, {Vec, Point} from "./GCEngine";
import {GenericNumberInput} from "./App";

export class Selected {
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

    public delete = () => {
        this._selectedPointId && GCEngine.deletePointFromDrawing(this._selectedPointId);
    }
}

export type SelectedPointProp = {
    id: string | null;
    point: Vec | null;
    deletePoint: () => void;
    killInstance: () => void;
}

export const SelectedPoint: React.FC<SelectedPointProp> = (props) => {
    const {point, deletePoint, killInstance} = props;
    return (
        <div className="dialog">
            <h2>Selected Point</h2>
            <button onClick={() => {deletePoint(); killInstance()}}>Delete</button>
            <div>
                <GenericNumberInput label={"X"} min={-99999} max={99999} step={0.01} value={point!.x} returnValue={(val) => {point!.x = val; GCEngine.draw()}} />
                <GenericNumberInput label={"Y"} min={-99999} max={99999} step={0.01} value={point!.y} returnValue={(val) => {point!.y = val; GCEngine.draw()}} />
                <GenericNumberInput label={"Z"} min={-99999} max={99999} step={0.01} value={point!.z} returnValue={(val) => {point!.z = val; GCEngine.draw()}} />
            </div>
        </div>
    );
}