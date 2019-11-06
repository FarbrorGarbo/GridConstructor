import React from "react";
import GCEngine, {Vec, Point} from "./GCEngine";
import {GenericNumberInput} from "./GenericNumberInput";

export class SelectedPoint {
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

export interface SelectedPointProp {
    instance: SelectedPoint;
    killInstance: () => void;
}

export const SelectedPointFC: React.FC<SelectedPointProp> = (props) => {
    const {instance, killInstance} = props;
    return (
        <div className="dialog">
            <h2>Selected Point</h2>
            <button onClick={() => {instance.delete(); killInstance()}}>Delete</button>
            <div>
                <GenericNumberInput label={"X"} min={-99999} max={99999} step={0.01} value={instance.point!.x} returnValue={(val) => {instance.point!.x = val; GCEngine.draw()}} />
                <GenericNumberInput label={"Y"} min={-99999} max={99999} step={0.01} value={instance.point!.y} returnValue={(val) => {instance.point!.y = val; GCEngine.draw()}} />
                <GenericNumberInput label={"Z"} min={-99999} max={99999} step={0.01} value={instance.point!.z} returnValue={(val) => {instance.point!.z = val; GCEngine.draw()}} />
            </div>
        </div>
    );
}