import React from "react";
import GCEngine from "./GCEngine";
import {GenericNumberInput} from "./GenericNumberInput";

export class NewPoint {
    constructor(
        private _x: number = 0,
        private _y: number = 0,
        private _z: number = 0
        ) {
            GCEngine.previewPoint = {x: 0, y: 0, z: 0};
            GCEngine.draw();
        }

    public get x() {
        return this._x;
    }

    public set x(val: number) {
        this._x = val;
        if (GCEngine.previewPoint) {
            GCEngine.previewPoint.x = val;
        }
        GCEngine.draw();
    }

    public get y() {
        return this._y;
    }

    public set y(val: number) {
        this._y = val;
        if (GCEngine.previewPoint) {
            GCEngine.previewPoint.y = val;
        }
        GCEngine.draw();
    }

    public get z() {
        return this._z;
    }

    public set z(val: number) {
        this._z = val;
        if (GCEngine.previewPoint) {
            GCEngine.previewPoint.z = val;
        }
        GCEngine.draw();
    }

    public create() {
        GCEngine.addPointToDrawing({x: this._x, y: this._y, z: this._z});
    }

    public cleanUp() {
        GCEngine.previewPoint = null;
        GCEngine.draw();
    }
}

export interface NewPointFCProps {
    instance: NewPoint;
    killInstance: () => void;
}

export const NewPointFC: React.FC<NewPointFCProps> = (props) => {
    const {instance, killInstance} = props;
    return (
        <div className="dialog">
            <h2>Add point</h2>
            <GenericNumberInput label="X" value={instance.x} min={-999} max={999} step={1} returnValue={(val) => {instance.x = val}} />
            <GenericNumberInput label="Y" value={instance.y} min={-999} max={999} step={1} returnValue={(val) => {instance.y = val}} />
            <GenericNumberInput label="Z" value={instance.z} min={-999} max={999} step={1} returnValue={(val) => {instance.z = val}} />
            <button onClick={() => {instance.create(); killInstance()}}>Create</button>
        </div>
    );
}