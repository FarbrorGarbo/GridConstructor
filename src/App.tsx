import React from "react";
import { Settings, Drawing } from "./GCEngine";
import GCView from "./GCView";
import "./App.css";

const readSettings = (initial: Settings) => {
	const localStorageData: string | null = localStorage.getItem("gc_settings");

	const value = !localStorageData
			? initial
			: JSON.parse(localStorageData);

	return value;
}

const readCurrentDrawing = () => {
	const localStorageData: string | null = localStorage.getItem("gc_current_drawing");

	const value = !localStorageData
			? {	// Default empty drawing with one point i origo
				points: {
					"x0_y0_z0": {x: 0, y: 0, z: 0}
				}
			}
			: JSON.parse(localStorageData);

	return value;
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

const App: React.FC = () => {
	// Load settings
	const loadedSettings: Settings = readSettings(
		{	// Default settings
			rotation: 0,
			elevation: 0,
			distance: 1000,
			picturePlane: 1000,
			offsetH: 1754,
			offsetV: 1240,
			docSize: {width: 3508, height: 2480}
		}
	);

	// Settings
	const [settings, updateSettings] = React.useState<Settings>(loadedSettings);

	const handleSettings = (key: string, value: number) => {
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

	React.useEffect(
		() => {
			// console.log("useEffekt", settings);
			localStorage.setItem("gc_settings",
			JSON.stringify(settings)
			);
		},
		[settings]
	);

	// Show/hide settings
	const [showSettings, toggle] = React.useState(false);

	function toggleSettings (event: any) {
		event.preventDefault();
		toggle(!showSettings);
	}

	// Drawing "document"
	const loadedDrawing: Drawing = readCurrentDrawing();
	const [drawing] = React.useState<Drawing>(loadedDrawing);

	React.useEffect(
		() => {console.log(drawing)},
		[drawing]
	);

	return (
		<div className="App">
			<GCView settings={settings} drawing={drawing} />

			<div className="menu">
				<button onClick={toggleSettings}>{showSettings ? "Back" : "Settings"}</button>
			</div>
			
			{showSettings &&
			<div className={"settings"}>
				<h2>Perspektive Settings</h2>
				<GenericNumberInput label={"Rotation"} min={0} max={359} step={5} value={settings.rotation} returnValue={(val) => handleSettings("rotation", val)} />
				<GenericNumberInput label={"Elevation"} min={0} max={90} step={5} value={settings.elevation} returnValue={(val) => handleSettings("elevation", val)} />
				<GenericNumberInput label={"Distance"} min={0} max={999999} step={50} value={settings.distance} returnValue={(val) => handleSettings("distance", val)} />
				<GenericNumberInput label={"Distance to Picture Plane"} min={0} max={999999} step={50} value={settings.picturePlane} returnValue={(val) => handleSettings("picturePlane", val)} />
				<GenericNumberInput label={"Offset Horisontal"} min={0} max={999999} step={5} value={settings.offsetH} returnValue={(val) => handleSettings("offsetH", val)} />
				<GenericNumberInput label={"Offset Vertical"} min={0} max={999999} step={5} value={settings.offsetV} returnValue={(val) => handleSettings("offsetV", val)} />
			</div>}
		</div>
	);
}

export default App;
