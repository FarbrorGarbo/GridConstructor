import React from "react";
import GCEngine, { Settings, Drawing } from "./GCEngine";

type ViewProps = {
	settings: Settings,
	drawing?: Drawing
}

const GridConstructor: React.FC<ViewProps> = ({ settings, drawing }: ViewProps) => {
	const canvasElm = React.useRef<HTMLCanvasElement>(null);
	const [canvasSize, setCanvasSize] = React.useState({width: window.innerWidth, height: window.innerHeight});

	// Lifecycle ComponentDidMount
	React.useLayoutEffect(() => {
		console.log("useLayout", canvasElm);
		const canvas = canvasElm.current;
		if (canvas)
			GCEngine.registerCanvas(canvas);

		const onResize = () => {
			setCanvasSize({width: window.innerWidth, height: window.innerHeight});
		}

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		}
	}, []);
	
	// Lifecycle effect
	React.useEffect(() => {
		GCEngine.draw(settings, drawing);
	}, [settings, canvasSize, drawing]);

  	return (
		<canvas className={"canvas"} ref={canvasElm} />
  	);
}

export default GridConstructor;
