// The GridConstructor 3d engine

class GCEngine {
    private _settings: Settings;

    constructor () {
        this._settings = this._getInitialSettings();
    }

    private _getInitialSettings () : Settings {
        return {
            rotation: 0,
            elevation: 0,
            distance: 1000,
            picturePlane: 1000,
            offsetH: 500,
            offsetV: 500
        }
    }

    private _degrees_to_radians = (degrees: number) => {
      return degrees * (Math.PI / 180);
    }

    public project (settings: Settings = this._settings, point: Vec) : Point {
        const rot = this._degrees_to_radians(settings.rotation);
        const elev = this._degrees_to_radians(settings.elevation);
        const n = point.x * Math.sin(rot) + point.y * Math.cos(rot);
        const a = point.x * Math.cos(rot) - point.y * Math.sin(rot);
        const b = n * Math.cos(elev) - point.z * Math.sin(elev);
        const c = n * Math.sin(elev) + point.z * Math.cos(elev);
        const H = settings.picturePlane * a / (settings.distance + b) + settings.offsetH;
        const V = settings.picturePlane * c / (settings.distance + b) + settings.offsetV;
        return {h: H, v: V};
    }
}

export type Settings = {
    rotation: number,
    elevation: number,
    distance: number,
    picturePlane: number,
    offsetH: number,
    offsetV: number
};

export type Vec = {
    x: number,
    y: number,
    z: number
};

export type Point = {
    h: number,
    v: number
};

export type Line = {
    start: Vec,
    end: Vec
};

export type Drawing = {
    points: {
        [key: string] : Vec
    }
}

export default new GCEngine ();
