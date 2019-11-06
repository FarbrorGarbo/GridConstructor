import React from "react";
import GCEngine, {Vec} from "./GCEngine";
import {GenericNumberInput} from "./GenericNumberInput";

export class NewPoint {
    constructor(
        private _x: number = 0,
        private _y: number = 0,
        private _z: number = 0,
        public callBack: (vector: Vec) => void
        ) {}

    public get x() {
        return this._x;
    }

    public set x(val: number) {
        this._x = val;
    }

    public get y() {
        return this._y;
    }

    public set y(val: number) {
        this._y = val;
    }

    public get z() {
        return this._z;
    }

    public set z(val: number) {
        this._z = val;
    }

    public create() {
        this.callBack({x: this._x, y: this._y, z: this._z});
        GCEngine.addPointToDrawing({x: this._x, y: this._y, z: this._z});
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