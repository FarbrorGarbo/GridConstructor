import React from "react";
import GCEngine from "./GCEngine";

const GCView: React.FC<{onClick: () => void}> = (props) => {
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
			onClick={() => {props.onClick()}}
		/>
  	);
}

export default GCView;
