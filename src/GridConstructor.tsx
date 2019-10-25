import React from "react";

type Settings = {
    rotation: number,
    elevation: number,
    distance: number,
    picturePlane: number,
    offsetH: number,
    offsetV: number
}

type ViewProps = {
    settings: Settings
}

type Vector = {
	x: number,
	y: number,
	z: number
}

const degrees_to_radians = (degrees: number) => {
  return degrees * (Math.PI / 180);
}

const projcet = (settings: Settings, point: Vector) => {
	const rot = degrees_to_radians(settings.rotation);
	const elev = degrees_to_radians(settings.elevation);
	const n = point.x * Math.sin(rot) + point.y * Math.cos(rot);
	const a = point.x * Math.cos(rot) - point.y * Math.sin(rot);
	const b = n * Math.cos(elev) - point.z * Math.sin(elev);
	const c = n * Math.sin(elev) + point.z * Math.cos(elev);
	const h = settings.picturePlane * a / (settings.distance + b) + settings.offsetH;
	const v = settings.picturePlane * c / (settings.distance + b) + settings.offsetV;
	return [h, v];
}

const GridConstructor: React.FC<ViewProps> = ({ settings }: ViewProps) => {
	const canvasElm = React.useRef<HTMLCanvasElement>(null);
	const [canvasSize, setCanvasSize] = React.useState({width: window.innerWidth, height: window.innerHeight});
	
	React.useEffect(() => {
		const canvas = canvasElm.current;
		// console.log(settings);

		if (canvas) {
			canvas.width = canvasSize.width;
			canvas.height = canvasSize.height;

			const ctx = canvas.getContext("2d");
			if (!!ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = "#f00";

				const xLines = [
					[{x:0, y:0, z:0}, {x:500, y:0, z:0}],
					[{x:480, y:0, z:5}, {x:500, y:0, z:0}]
				]
				xLines.forEach(line => {
					const calcPointA = projcet(settings, line[0]);
					const calcPointB = projcet(settings, line[1]);
					ctx.beginPath();
					ctx.moveTo(calcPointA[0], canvas.height - calcPointA[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
					ctx.stroke();
				});

				ctx.strokeStyle = "#0f0";
				const yLines = [
					[{x:0, y:0, z:0}, {x:0, y:500, z:0}],
					[{x:5, y:480, z:0}, {x:0, y:500, z:0}]
				]
				yLines.forEach(line => {
					const calcPointA = projcet(settings, line[0]);
					const calcPointB = projcet(settings, line[1]);
					ctx.beginPath();
					ctx.moveTo(calcPointA[0], canvas.height - calcPointA[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
					ctx.stroke();
				});

				ctx.strokeStyle = "#00f";
				const zLines = [
					[{x:0, y:0, z:0}, {x:0, y:0, z:500}],
					[{x:5, y:0, z:480}, {x:0, y:0, z:500}]
				]
				zLines.forEach(line => {
					const calcPointA = projcet(settings, line[0]);
					const calcPointB = projcet(settings, line[1]);
					ctx.beginPath();
					ctx.moveTo(calcPointA[0], canvas.height - calcPointA[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
					ctx.stroke();
				});

				ctx.strokeStyle = "#aaa";
				ctx.beginPath();

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
					const calcPointA = projcet(settings, line[0]);
					const calcPointB = projcet(settings, line[1]);
					ctx.moveTo(calcPointA[0], canvas.height - calcPointA[1]);
					ctx.lineTo(calcPointB[0], canvas.height - calcPointB[1]);
				});
				ctx.stroke();
			}
		}

		const onResize = () => {
			setCanvasSize({width: window.innerWidth, height: window.innerHeight});
		}

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		}
	},
	[settings, canvasSize]
	);

  	return (
		<canvas className={"canvas"} ref={canvasElm} />
  	);
}

export default GridConstructor;
