
"use client";

import {gizmoLines} from "./data";

// The GridConstructor 3d engine
class GCEngine {
    private _version: string;
    private _settings: Settings;
    private _drawing: Drawing;
    private _canvasElm: HTMLCanvasElement | undefined;
    private _cxt: CanvasRenderingContext2D | null;
    private _scale: number;
    private _pan: {h: number, v: number};
    public selectedPoint: Vec | null;
    public previewPoint: Vec | null;

    constructor () {
        this._version = "0.1.4"
        this._settings = this._getPersistentData("gc_settings", this._getInitialSettings());
        this._drawing = this._getPersistentData("gc_current_drawing", {points: {"0,0,0": {x: 0, y: 0, z: 0}}});
        this._scale = 1;
        this._pan = {h: typeof window !== 'undefined' ? window.innerWidth/2 : 0, v: typeof window !== 'undefined' ? -window.innerHeight/2 : 0};
        this._cxt = null;
        this.selectedPoint = null;
        this.previewPoint = null;
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

    private _getPersistentData = (key: string, defaultData: any) => {
        if (typeof window === 'undefined') return defaultData;
        const localStorageData: string | null = localStorage.getItem(key);
        return !localStorageData ? defaultData : JSON.parse(localStorageData);
    }

    private _degrees_to_radians = (degrees: number) => {
      return degrees * (Math.PI / 180);
    }

    private _drawLine(settings: Settings, useScale: boolean = true, line: Line, color: string) {
        const calcPointA = this.project(settings, line.start, useScale);
        const calcPointB = this.project(settings, line.end, useScale);
        this._cxt!.strokeStyle = color;
        this._cxt!.beginPath();
        this._cxt!.moveTo(calcPointA.h, this._canvasElm!.height - calcPointA.v);
        this._cxt!.lineTo(calcPointB.h, this._canvasElm!.height - calcPointB.v);
        this._cxt!.stroke();
    };

    private _drawGizmo() {
        if (!this._cxt) return;
        let settings = {...this._settings};
        settings.distance = 999999;
        settings.picturePlane = 999999;

        const drawAxis = (color: string, lines: Line[]) => {
            this._cxt!.strokeStyle = color;
            lines.forEach(line => {
                this._drawLine(settings, false, line, color);
            });
        }

        const lines = gizmoLines();
        drawAxis("#f00", lines[0]);
        drawAxis("#0f0", lines[1]);
        drawAxis("#00f", lines[2]);
    }

    public project(settings: Settings = this._settings, point: Vec, useScale: boolean = true) : Point {
        const rot = this._degrees_to_radians(settings.rotation);
        const elev = this._degrees_to_radians(settings.elevation);
        const n = point.x * Math.sin(rot) + point.y * Math.cos(rot);
        const a = point.x * Math.cos(rot) - point.y * Math.sin(rot);
        const b = n * Math.cos(elev) - point.z * Math.sin(elev);
        const c = n * Math.sin(elev) + point.z * Math.cos(elev);
        const H = settings.picturePlane * a / (settings.distance + b); // + settings.offsetH;
        const V = settings.picturePlane * c / (settings.distance + b); // + settings.offsetV;

        if (useScale)  return {h: H * this._scale + this._pan.h, v: V * this._scale - this._pan.v};
        return {h: H + this._pan.h, v: V - this._pan.v};
    }

    public get heightOfDrawing() {
        return this._canvasElm?.clientHeight ?? 0;
    }

    public get drawing() {
        return this._drawing;
    }

    public addPointToDrawing(vector: Vec, id?: string) {
        if (id) {
            this._drawing.selectedPoint = vector;
        } else {
            if (this._drawing.points["" + vector.x + "," + vector.y + "," + vector.z] !== undefined) return null;
            this._drawing.points["" + vector.x + "," + vector.y + "," + vector.z] = vector;
        }
        console.log(this._drawing);
        this.draw();
    }

    public deletePointFromDrawing(id: string) {
        if (this._drawing.points[id]) {
            delete this._drawing.points[id];
            this.draw();
        }
    }

    public getSettings(): Settings {
        return this._settings;
    }

    public setSettings(settings: Settings) {
        if (JSON.stringify(this._settings) !== JSON.stringify(settings)) {
            this._settings = settings;
            if (typeof window !== 'undefined') localStorage.setItem("gc_settings", JSON.stringify(this._settings));
            this.draw();
        }
    }

    public setCanvasSize() {
        if (this._canvasElm?.getContext && typeof window !== 'undefined') {
            this._canvasElm.width = window.innerWidth;
            this._canvasElm.height = window.innerHeight;
        }
    }

    public getScale() {
        return this._scale;
    }

    public setScale(scale: number) {
        this._scale = scale;
        this.draw();
    }

    public pan(x: number, y: number) {
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
        this._pan.h += x / dpr;
        this._pan.v += y / dpr;
    }

    public registerCanvas(canvasElm?: HTMLCanvasElement) {
        if (canvasElm?.getContext && typeof window !== 'undefined') {
            this._canvasElm = canvasElm;
            this._canvasElm.width = window.innerWidth;
            this._canvasElm.height = window.innerHeight;
            this._cxt = this._canvasElm.getContext("2d");
            this._scale = 1;
            console.log("version", this._version);
        } else {
            console.warn("Registered canvas element is not of type <canvas>!");
        }
    }

    public draw() { // settings: Settings = this._settings, drawing?: Drawing) {
        if (this._canvasElm && this._cxt && typeof window !== 'undefined') {
            this._canvasElm.width = window.innerWidth;
            this._canvasElm.height = window.innerHeight;

            // Clear by drawing document background
            this._cxt.fillStyle = "rgb(231, 230, 227)";
            this._cxt.fillRect(0, 0, this._canvasElm.width, this._canvasElm.height);

            // Draw size of document
            const settings = {...this._settings};
            settings.rotation = 0;
            settings.elevation = 0;
            settings.picturePlane = settings.distance;
            this._cxt.fillStyle = "rgb(245,245,245)";
            const calcPoint1 = this.project(settings, {x:0, y:0, z:settings.docSize.height});
            const calcPoint2 = this.project(settings, {x:settings.docSize.width, y:0, z:0});
            this._cxt.fillRect(calcPoint1.h - settings.offsetH * this._scale, this._canvasElm!.height - calcPoint1.v + settings.offsetV * this._scale, calcPoint2.h - calcPoint1.h, calcPoint1.v - calcPoint2.v);

            this._cxt.strokeStyle = "#aaa";
            const lines = [
                [{x:0, y:0, z:0}, {x:settings.docSize.width, y:0, z: 0}],
                [{x:0, y:0, z:settings.docSize.height}, {x:settings.docSize.width, y:0, z: settings.docSize.height}],
                [{x:0, y:0, z:0}, {x:0, y:0, z: this._settings.docSize.height}],
                [{x:settings.docSize.width, y:0, z:0}, {x:settings.docSize.width, y:0, z: settings.docSize.height}],
            ]

            lines.forEach(line => {
                const calcPointA = this.project(settings, line[0]);
                const calcPointB = this.project(settings, line[1]);
                this._cxt!.beginPath();
                this._cxt!.moveTo(calcPointA.h - settings.offsetH * this._scale, this._canvasElm!.height - calcPointA.v + settings.offsetV * this._scale);
                this._cxt!.lineTo(calcPointB.h - settings.offsetH * this._scale, this._canvasElm!.height - calcPointB.v + settings.offsetV * this._scale);
                this._cxt!.stroke();
            });

            // Gizmo
            this._drawGizmo();

            this._cxt.strokeStyle = "#aaa";
            this._cxt.beginPath();

            const cubeLines = [
                [{x:-100, y:-100, z:-100}, {x:100, y:-100, z:-100}],
                [{x:-100, y:100, z:-100}, {x:100, y:100, z:-100}],
                [{x:-100, y:-100, z:100}, {x:100, y:-100, z:100}],
                [{x:-100, y:100, z:100}, {x:100, y:100, z:100}],

                [{x:-100, y:-100, z:-100}, {x:-100, y:-100, z:100}],
                [{x:100, y:-100, z:-100}, {x:100, y:-100, z:100}],
                [{x:100, y:100, z:-100}, {x:100, y:100, z:100}],
                [{x:-100, y:100, z:-100}, {x:-100, y:100, z:100}],
                
                [{x:-100, y:-100, z:100}, {x:-100, y:100, z:100}],
                [{x:100, y:-100, z:100}, {x:100, y:100, z:100}],
                [{x:-100, y:-100, z:-100}, {x:-100, y:100, z:-100}],
                [{x:100, y:-100, z:-100}, {x:100, y:100, z:-100}]
            ]
            cubeLines.forEach(line => {
                this._drawLine(this._settings, true, {start: line[0], end: line[1]}, "#aaa");
            });
            this._cxt.stroke();

            if (this._drawing) {
                this._cxt.strokeStyle = "#000";
                for (const key in this._drawing.points) {
                    const calc = this.project(this._settings, this._drawing.points[key]);
                    this._cxt!.beginPath();
                    this._cxt!.arc(calc.h, this._canvasElm!.height - calc.v, 5, 0, 2 * Math.PI);
                    this._cxt!.stroke();
                }
                this._cxt.strokeStyle = "#d00";
                if (this.previewPoint) {
                    const calc = this.project(this._settings, this.previewPoint);
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
    },
    selectedPoint?: Vec
}

export default new GCEngine ();

