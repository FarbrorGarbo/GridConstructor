import React from "react";
import GCEngine, { Settings, Drawing } from "./GCEngine";

type ViewProps = {
	settings: Settings,
	drawing?: Drawing
}

const GCView: React.FC<ViewProps> = ({ settings, drawing }: ViewProps) => {
	const canvasElm = React.useRef<HTMLCanvasElement>(null);

	// Lifecycle ComponentDidMount: should only occur once and give us a persistant ref to the canvas.
	React.useLayoutEffect(() => {
		// console.log("useLayout", canvasElm);
		const canvas = canvasElm.current;
		if (canvas)
			GCEngine.registerCanvas(canvas);

	}, []);

  	return (
		<canvas
			className={"canvas"}
			ref={canvasElm}
		/>
  	);
}

export default GCView;
