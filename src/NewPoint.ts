import GCEngine, {Vec} from "./GCEngine";

export default class newPoint {
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