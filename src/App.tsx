import React from "react";
import GCEngine, {Vec} from "./GCEngine";
import GCView from "./GCView";
import {NewPoint, NewPointFC} from "./NewPoint";
import {SelectedPointFC, SelectedPoint} from "./SelectedPoint";
import "./App.css";
import { SettingsDialogFC, SettingsDialog } from "./SettingsDialog";

const App: React.FC = () => {
	// Show/hide settings
	const [settingsInstance, setSettingsInstance] = React.useState<SettingsDialog | null>(null);

	const toggleSettings = (event: any) => {
		event.preventDefault();
		if (settingsInstance) {
			setSettingsInstance(null);
		} else {
			setSettingsInstance(new SettingsDialog());
		}
		showAddPoint(null);
		selectPoint(null);
	}

	// Pan
	const [mousePos, mouseMoved] = React.useState<{x: number, y: number} | null>(null);

	const handleMouseMove = (event: React.MouseEvent) => {
		if (event.buttons === 1) {
			mouseMoved({x: event.movementX, y: event.movementY});
		} else if (mousePos) {
			mouseMoved(null);
		}
	}

	// Zoom
	const [scale, setScale] = React.useState(1);

	const handleZoom = (event: React.WheelEvent) => {
		let newScale = scale - event.deltaY * 0.0005;
		if (newScale < 0.2) newScale = 0.2;
		setScale(newScale);
	}

	React.useEffect(
		() => { GCEngine.setScale(scale) },
		[scale]
	);

	React.useEffect(
		() => {
			mousePos && GCEngine.pan(mousePos.x, mousePos.y);
			GCEngine.draw();

			const onResize = () => {
				GCEngine.setCanvasSize();
				GCEngine.draw();
			}
	
			window.addEventListener('resize', onResize);
	
			return () => {
				window.removeEventListener('resize', onResize);
			}
		},
		[mousePos]
	);

	// Handle touch events for zooming and scaling
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
			setLastTouchDistance(0);
			setTouchRefPoint([event.touches[0].clientX, event.touches[0].clientY]);
		}
		setTouchMovement([0, 0]);
	}

	const handleTouchMove = (event: React.TouchEvent) => {
		if (event.touches.length > 1) {
			const deltaX2 = event.touches[1].clientX - event.touches[0].clientX;
			const deltaY2 = event.touches[1].clientY - event.touches[0].clientY;
			const distance = Math.sqrt(deltaX2 * deltaX2 + deltaY2 * deltaY2);
			const delta = distance - lastTouchDistance;
			setTouchDistance(delta);
			setLastTouchDistance(distance);
		} else {
			const deltaX = Math.ceil(event.touches[0].clientX - touchRefPoint[0]);
			const deltaY = Math.ceil(event.touches[0].clientY - touchRefPoint[1]);
			setTouchRefPoint([touchRefPoint[0] + deltaX, touchRefPoint[1] + deltaY]);
			setTouchMovement([deltaX, deltaY]);
			setTouchDistance(0);
			setLastTouchDistance(0);
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
				touchMovement[0] !== 0 && touchMovement[1] !== 0 && GCEngine.pan(touchMovement[0] * window.devicePixelRatio, touchMovement[1] * window.devicePixelRatio);
				GCEngine.draw();
			}
		},
		[touchMovement, touchDistance]
	);

	// Add a point to the drawing
	const [addPointInstance, showAddPoint] = React.useState<NewPoint | null>(null);
	const addPoint = () => {
		if (addPointInstance) showAddPoint(null);
		else showAddPoint(new NewPoint(0, 0, 0, (vector: Vec) => {showAddPoint(null)}));
		setSettingsInstance(null);
		selectPoint(null);
	}

	// Select point
	const [selectedPointInstance, selectPoint] = React.useState<SelectedPoint | null>(null);
	const trySelectPoint = (event: React.MouseEvent) => {
		const sel = new SelectedPoint({h: event.clientX, v: event.clientY});
		setSettingsInstance(null);
		showAddPoint(null);
		selectPoint(!!sel.id ? sel : null);
	}

	return (
		<div
			className="App"
			onMouseMove={(e) => handleMouseMove(e)}
			onWheel={(e) => handleZoom(e)}
			onTouchStart={(e) => {handleTouchStart(e)}}
			onTouchEnd={(e) => {handleTouchEnd(e)}}
			onTouchMove={(e) => {handleTouchMove(e)}}
		>
			<GCView onClick={(e) => trySelectPoint(e)} />

			<div className="menu">
				<button onClick={toggleSettings}>{settingsInstance ? "Back" : "Settings"}</button>
				<button onClick={addPoint}>Add point</button>
			</div>

			{settingsInstance && <SettingsDialogFC instance={settingsInstance} killInstance={() => setSettingsInstance(null)} />}
			{addPointInstance && <NewPointFC instance={addPointInstance} killInstance={() => showAddPoint(null)} />}
			{selectedPointInstance && <SelectedPointFC instance={selectedPointInstance} killInstance={() => selectPoint(null)} />}
		</div>
	);
}

export default App;
