import React from "react";
import GCEngine, { Settings, Drawing } from "./GCEngine";

type ViewProps = {
	settings: Settings,
	drawing?: Drawing
}

const GridConstructor: React.FC<ViewProps> = ({ settings, drawing }: ViewProps) => {
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
					const calcPointA = GCEngine.project(settings, line[0]);
					const calcPointB = GCEngine.project(settings, line[1]);
					ctx.beginPath();
					ctx.moveTo(calcPointA.h, canvas.height - calcPointA.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
					ctx.stroke();
				});

				ctx.strokeStyle = "#0f0";
				const yLines = [
					[{x:0, y:0, z:0}, {x:0, y:500, z:0}],
					[{x:5, y:480, z:0}, {x:0, y:500, z:0}]
				]
				yLines.forEach(line => {
					const calcPointA = GCEngine.project(settings, line[0]);
					const calcPointB = GCEngine.project(settings, line[1]);
					ctx.beginPath();
					ctx.moveTo(calcPointA.h, canvas.height - calcPointA.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
					ctx.stroke();
				});

				ctx.strokeStyle = "#00f";
				const zLines = [
					[{x:0, y:0, z:0}, {x:0, y:0, z:500}],
					[{x:5, y:0, z:480}, {x:0, y:0, z:500}]
				]
				zLines.forEach(line => {
					const calcPointA = GCEngine.project(settings, line[0]);
					const calcPointB = GCEngine.project(settings, line[1]);
					ctx.beginPath();
					ctx.moveTo(calcPointA.h, canvas.height - calcPointA.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
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
					const calcPointA = GCEngine.project(settings, line[0]);
					const calcPointB = GCEngine.project(settings, line[1]);
					ctx.moveTo(calcPointA.h, canvas.height - calcPointA.v);
					ctx.lineTo(calcPointB.h, canvas.height - calcPointB.v);
				});
				ctx.stroke();

				// Drawing
				if (drawing) {
					ctx.strokeStyle = "#000";
					for (const key in drawing.points) {
						const calc = GCEngine.project(settings, drawing.points[key]);
						ctx.beginPath();
						ctx.arc(calc.h, calc.v, 5, 0, 2 * Math.PI);
						ctx.stroke();
					}
				}
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
	[settings, canvasSize, drawing]
	);

  	return (
		<canvas className={"canvas"} ref={canvasElm} />
  	);
}

export default GridConstructor;
