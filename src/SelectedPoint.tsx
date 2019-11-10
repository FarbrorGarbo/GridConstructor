import React from "react";
import GCEngine, {Vec, Point} from "./GCEngine";
import {GenericNumberInput} from "./GenericNumberInput";

export class SelectedPoint {
    private _selectedPointId: string;

    constructor(pointId?: string) {
        if (pointId) {
            this._selectedPointId = pointId;
            GCEngine.previewPoint = {...GCEngine.drawing.points[pointId]};
        } else {
            this._selectedPointId = "0,0,0";
            GCEngine.previewPoint = {x: 0, y: 0, z: 0};
        }
        GCEngine.draw();
    }

    public static pointIdAtPosition(mousePosition: Point): string {
        const settings = GCEngine.getSettings();
        let found = "";
        Object.keys(GCEngine.drawing.points).forEach((key: string) => {
            const vector = GCEngine.drawing.points[key];
            const pos = GCEngine.project(settings, vector, true);
            const deltaH = mousePosition.h - pos.h;
            const deltaV = GCEngine.heightOfDrawing - mousePosition.v - pos.v;
            const distance = Math.sqrt(deltaH * deltaH + deltaV * deltaV);
            if (distance < 7) {
                found = key;
            }
        });
        return found;
    }

    public get id() {
        return this._selectedPointId;
    }

    public getIdFromSelectedPoint() {
        return "" + GCEngine.previewPoint!.x + "," + GCEngine.previewPoint!.y + "," + GCEngine.previewPoint!.z;
    }

    public get point(): Vec {
        return GCEngine.previewPoint!;
    }

    public delete = () => {
        const id = this.getIdFromSelectedPoint();
        GCEngine.deletePointFromDrawing(id);
    }

    public set = () => {
        if (GCEngine.previewPoint) {
            const newId = this.getIdFromSelectedPoint();
            if (GCEngine.drawing.points[newId]) return null;
            GCEngine.deletePointFromDrawing(this._selectedPointId!);
            this._selectedPointId = newId;
            GCEngine.addPointToDrawing({x: GCEngine.previewPoint.x, y: GCEngine.previewPoint.y, z: GCEngine.previewPoint.z});
            GCEngine.draw();
        }
    }

    public copy = () => {
        if (GCEngine.previewPoint) {
            // Check to see that no other point is occupying the same Vec position
            if (this._getPointFromDrawing(GCEngine.previewPoint.x, GCEngine.previewPoint.y, GCEngine.previewPoint.z)) {
                console.warn("Point occupied!");
            } else {
                GCEngine.addPointToDrawing({x: GCEngine.previewPoint.x, y: GCEngine.previewPoint.y, z: GCEngine.previewPoint.z});
                GCEngine.draw();
            }
        }
    }

    public cleanUp = () => {
        GCEngine.previewPoint = null;
        GCEngine.draw();
    }

    private _getPointFromDrawing(x: number, y: number, z: number) {
        const id = "" + x + "," + y + "," + z;
        if (!GCEngine.drawing.points[id]) return null;
        return GCEngine.drawing.points[id]
    }
}

export interface SelectedPointProp {
    instance: SelectedPoint;
    killInstance: () => void;
}

export const SelectedPointFC: React.FC<SelectedPointProp> = (props) => {
    const {instance, killInstance} = props;
    GCEngine.draw();
    return (
        <div className="dialog">
            <h2>Selected Point</h2>
            <button onClick={() => {instance.delete(); killInstance()}}>Delete</button>
            <button onClick={() => instance.set()}>Set</button>
            <button onClick={() => instance.copy()}>Copy</button>
            <div>
                <GenericNumberInput label={"X"} min={-99999} max={99999} step={0.01} value={instance.point.x} returnValue={(val) => {instance.point!.x = val; GCEngine.draw()}} />
                <GenericNumberInput label={"Y"} min={-99999} max={99999} step={0.01} value={instance.point.y} returnValue={(val) => {instance.point!.y = val; GCEngine.draw()}} />
                <GenericNumberInput label={"Z"} min={-99999} max={99999} step={0.01} value={instance.point.z} returnValue={(val) => {instance.point!.z = val; GCEngine.draw()}} />
            </div>
        </div>
    );
}