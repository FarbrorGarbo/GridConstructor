import React from "react";
import GCEngine from "./GCEngine";

const GCView: React.FC = () => {
	const canvasElm = React.useRef<HTMLCanvasElement>(null);

	// Lifecycle ComponentDidMount: should only occur once and give us a persistant ref to the canvas.
	React.useLayoutEffect(() => {
		// console.log("useLayout", canvasElm);
		const canvas = canvasElm.current;
		if (canvas)
			GCEngine.registerCanvas(canvas);

	}, []);

	const [touchRefPoint, setTouchRefPoint] = React.useState<[number, number]>([-1, -1]);
	const [touchMovement, setTouchMovement] = React.useState<[number, number]>([0, 0]);
	const [touchDistance, setTouchDistance] = React.useState<number>(0);
	const [lastTouchDistance, setLastTouchDistance] = React.useState<number>(0);

	const handleTouchStart = (event: React.TouchEvent) => {
		if (event.touches.length === 2) {
			const deltaX = event.touches[1].clientX - event.touches[0].clientX;
			const deltaY = event.touches[1].clientY - event.touches[0].clientY;
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			setTouchDistance(0);
			setLastTouchDistance(distance);
		}
		if (event.touches.length === 1) {
			setTouchRefPoint([event.touches[0].clientX, event.touches[0].clientY]);
		}
	}

	const handleTouchEnd = (event: React.TouchEvent) => {
		if (event.touches.length === 1) {
			setTouchDistance(0);
			setTouchRefPoint([event.touches[0].clientX, event.touches[0].clientY]);
		}
		if (event.touches.length === 0) {
			setTouchMovement([0, 0]);
		}
	}

	const handleTouchMove = (event: React.TouchEvent) => {
		if (touchRefPoint[0] === -1) return;
		if (event.touches.length > 1) {
			const deltaX = event.touches[1].clientX - event.touches[0].clientX;
			const deltaY = event.touches[1].clientY - event.touches[0].clientY;
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			const delta = distance - lastTouchDistance;
			setTouchDistance(delta);
			setLastTouchDistance(distance);
		} else {
			const deltaX = event.touches[0].clientX - touchRefPoint[0];
			const deltaY = event.touches[0].clientY - touchRefPoint[1];
			setTouchRefPoint([touchRefPoint[0] + deltaX, touchRefPoint[1] + deltaY]);
			setTouchMovement([deltaX, deltaY]);
		}
	}

	React.useEffect(
		() => {
			if (touchDistance !== 0) {
				const curScale = GCEngine.getScale();
				let newScale = curScale + touchDistance * 0.001;
				if (newScale < 0.2) newScale = 0.2;
				GCEngine.setScale(newScale);
			} else {
				touchMovement[0] !== 0 && touchMovement[1] !== 0 && GCEngine.pan(touchMovement[0], touchMovement[1]);
				GCEngine.draw();
			}
		},
		[touchMovement, touchDistance]
	);

  	return (
		<canvas
			onTouchStart={(e) => {handleTouchStart(e)}}
			onTouchEnd={(e) => {handleTouchEnd(e)}}
			onTouchMove={(e) => {handleTouchMove(e)}}
			className={"canvas"}
			ref={canvasElm}
		/>
  	);
}

export default GCView;
