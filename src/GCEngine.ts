// The GridConstructor 3d engine

class GCEngine {
    private _settings: Settings;
    private _canvasElm: HTMLCanvasElement | undefined;
    private _cxt: CanvasRenderingContext2D | null;

    constructor () {
        this._settings = this._getInitialSettings();
        this._cxt = null;
    }

    private _getInitialSettings () : Settings {
        return {
            rotation: 0,
            elevation: 0,
            distance: 1000,
            picturePlane: 1000,
            offsetH: 1754,
            offsetV: 1240,
            docSize: {width: 3508, height: 2480} // A4 portrait in 300 ppi
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

    public registerCanvas(canvasElm: HTMLCanvasElement) {
        if (canvasElm && canvasElm.getContext) {
            this._canvasElm = canvasElm;
            this._cxt = this._canvasElm.getContext("2d");
        } else {
            console.warn("Registered canvase element is not of type <canvas>!");
        }
    }

    public draw(settings: Settings = this._settings, drawing?: Drawing) {
        if (this._canvasElm && this._cxt) {
			this._canvasElm.width = settings.docSize.width;
            this._canvasElm.height = settings.docSize.height;
            
            this._cxt.clearRect(0, 0, this._canvasElm.width, this._canvasElm.height);

            // Draw document background
            this._cxt.fillStyle = "rgb(231, 230, 227)";
            this._cxt.fillRect(0, 0, this._canvasElm.width, this._canvasElm.height);
            this._cxt.strokeStyle = "#f00";

            const xLines = [
                [{x:0, y:0, z:0}, {x:500, y:0, z:0}],
                [{x:480, y:0, z:5}, {x:500, y:0, z:0}]
            ]
            xLines.forEach(line => {
                const calcPointA = this.project(settings, line[0]);
                const calcPointB = this.project(settings, line[1]);
                this._cxt!.beginPath();
                this._cxt!.moveTo(calcPointA.h, this._canvasElm!.height - calcPointA.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
                this._cxt!.stroke();
            });

            this._cxt.strokeStyle = "#0f0";
            const yLines = [
                [{x:0, y:0, z:0}, {x:0, y:500, z:0}],
                [{x:5, y:480, z:0}, {x:0, y:500, z:0}]
            ]
            yLines.forEach(line => {
                const calcPointA = this.project(settings, line[0]);
                const calcPointB = this.project(settings, line[1]);
                this._cxt!.beginPath();
                this._cxt!.moveTo(calcPointA.h, this._canvasElm!.height - calcPointA.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
                this._cxt!.stroke();
            });

            this._cxt.strokeStyle = "#00f";
            const zLines = [
                [{x:0, y:0, z:0}, {x:0, y:0, z:500}],
                [{x:5, y:0, z:480}, {x:0, y:0, z:500}]
            ]
            zLines.forEach(line => {
                const calcPointA = this.project(settings, line[0]);
                const calcPointB = this.project(settings, line[1]);
                this._cxt!.beginPath();
                this._cxt!.moveTo(calcPointA.h, this._canvasElm!.height - calcPointA.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
                this._cxt!.stroke();
            });

            this._cxt.strokeStyle = "#aaa";
            this._cxt.beginPath();

            const cubeLines = [
                [{x:-200, y:-200, z:-200}, {x:200, y:-200, z:-200}],
                [{x:-200, y:200, z:-200}, {x:200, y:200, z:-200}],
                [{x:-200, y:-200, z:200}, {x:200, y:-200, z:200}],
                [{x:-200, y:200, z:200}, {x:200, y:200, z:200}],

                [{x:-200, y:-200, z:-200}, {x:-200, y:-200, z:200}],
                [{x:200, y:-200, z:-200}, {x:200, y:-200, z:200}],
                [{x:200, y:200, z:-200}, {x:200, y:200, z:200}],
                [{x:-200, y:200, z:-200}, {x:-200, y:200, z:200}],
                
                [{x:-200, y:-200, z:200}, {x:-200, y:200, z:200}],
                [{x:200, y:-200, z:200}, {x:200, y:200, z:200}],
                [{x:-200, y:-200, z:-200}, {x:-200, y:200, z:-200}],
                [{x:200, y:-200, z:-200}, {x:200, y:200, z:-200}]
            ]
            cubeLines.forEach(line => {
                const calcPointA = this.project(settings, line[0]);
                const calcPointB = this.project(settings, line[1]);
                this._cxt!.moveTo(calcPointA.h, this._canvasElm!.height - calcPointA.v);
                this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
            });
            this._cxt.stroke();

            if (drawing) {
                this._cxt.strokeStyle = "#000";
                for (const key in drawing.points) {
                    const calc = this.project(settings, drawing.points[key]);
                    this._cxt!.beginPath();
                    this._cxt!.arc(calc.h, this._canvasElm!.height - calc.v, 5, 0, 2 * Math.PI);
                    this._cxt!.stroke();
                }
            }
        }
    }
}

export type Settings = {
    rotation: number,
    elevation: number,
    distance: number,
    picturePlane: number,
    offsetH: number,
    offsetV: number,
    docSize: {width: number, height: number}
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
