import React from "react";
import GCEngine, {Settings} from "./GCEngine";
import GCView from "./GCView";
import "./App.css";

const App: React.FC = () => {
	// Settings
	const [settings, updateSettings] = React.useState<Settings>(GCEngine.getSettings());

	const handleSettings = (key: string, value: number) => {
		if (settings) {
			let settingsCopy: Settings = {...settings};
		switch (key) {
			case "rotation": settingsCopy.rotation = value; break;
			case "elevation": settingsCopy.elevation = value; break;
			case "distance": settingsCopy.distance = value; break;
			case "picturePlane": settingsCopy.picturePlane = value; break;
			case "offsetH": settingsCopy.offsetH = value; break;
			case "offsetV": settingsCopy.offsetV = value; break;
		}
		if (JSON.stringify(settings) !== JSON.stringify(settingsCopy))
			updateSettings(settingsCopy);
		}
	}

	React.useEffect(
		() => { GCEngine.setSettings(settings) },
		[settings]
	);

	// Show/hide settings
	const [showSettings, toggle] = React.useState(false);

	const toggleSettings = (event: any) => {
		event.preventDefault();
		toggle(!showSettings);
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
		[mousePos, settings]
	);

	return (
		<div className="App" onMouseMove={(e) => handleMouseMove(e)} onWheel={(e) => handleZoom(e)} >
			<GCView/>

			<div className="menu">
				<button onClick={toggleSettings}>{showSettings ? "Back" : "Settings"}</button>
			</div>

			{showSettings &&
			<div className={"settings"}>
				<h2>Perspektive Settings</h2>
				<GenericNumberInput label={"Rotation"} min={0} max={359} step={5} value={settings.rotation} returnValue={(val) => handleSettings("rotation", val)} />
				<GenericNumberInput label={"Elevation"} min={-90} max={90} step={5} value={settings.elevation} returnValue={(val) => handleSettings("elevation", val)} />
				<GenericNumberInput label={"Distance"} min={0} max={999999} step={50} value={settings.distance} returnValue={(val) => handleSettings("distance", val)} />
				<GenericNumberInput label={"Distance to Picture Plane"} min={0} max={999999} step={50} value={settings.picturePlane} returnValue={(val) => handleSettings("picturePlane", val)} />
				<GenericNumberInput label={"Offset Horisontal"} min={0} max={999999} step={5} value={settings.offsetH} returnValue={(val) => handleSettings("offsetH", val)} />
				<GenericNumberInput label={"Offset Vertical"} min={0} max={999999} step={5} value={settings.offsetV} returnValue={(val) => handleSettings("offsetV", val)} />
			</div>}
		</div>
	);
}

type GenericNumberInputProps = {
	label: string;
	min: number;
	max: number;
	step: number;
	value: number;
	returnValue(val: number): void;
}

const GenericNumberInput: React.FC<GenericNumberInputProps> = (props) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [value, setValue] = React.useState(props.value);

	const updateValue = () => {
		let  newValue = parseInt(inputRef.current!.value === "" ? "0" : inputRef.current!.value);
		if (newValue < props.min) newValue = props.min;
		else if (newValue > props.max) newValue = props.max;
		setValue(newValue);
	}

	const {returnValue} = props;

	React.useEffect( () => { returnValue(value) }, [returnValue, value] );

	return (
		<label>{props.label}:
			<input
				ref={inputRef}
				type="number"
				min={props.min}
				max={props.max}
				step={props.step}
				onChange={() => updateValue()}
				value={value.toString()}
			/>
		</label>
	);
}

export default App;
