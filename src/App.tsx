import React from "react";
import { Settings } from "./GCEngine";
import GCView from "./GCView";
import "./App.css";

const readSettings = (initial: Settings) => {
	const localStorageData: string | null = localStorage.getItem("grid");

	const value = !localStorageData
			? initial
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
	const settings: Settings = readSettings(
		{
			rotation: 0,
			elevation: 0,
			distance: 1000,
			picturePlane: 1000,
			offsetH: Math.floor(window.innerWidth/2),
			offsetV: Math.floor(window.innerHeight/2)
		}
	);

	// Show/hide settings
	const [showSettings, toggle] = React.useState(false);

	function toggleSettings (event: any) {
		event.preventDefault();
		toggle(!showSettings);
	}

	// Settings
	const [rotation, setRotation] = React.useState( settings.rotation );
	const [elevation, setElevation] = React.useState( settings.elevation );
	const [distance, setDistance] = React.useState( settings.distance );
	const [picturePlane, setPicturePlane] = React.useState( settings.picturePlane);
	const [offsetH, setOffsetH] = React.useState( settings.offsetH );
	const [offsetV, setOffsetV] = React.useState( settings.offsetV );

	const handleRotation = (value: number) => { setRotation(value) };
	const handleElevation = (value: number) => { setElevation(value) };
	const handleDistance = (value: number) => { setDistance(value) };
	const handlePicturePlane = (value: number) => { setPicturePlane(value) };
	const handleOffsetH = (value: number) => { setOffsetH(value) };
	const handleOffsetV = (value: number) => { setOffsetV(value) };

	React.useEffect(
		() => { 
			localStorage.setItem("grid", JSON.stringify(
				{
					rotation: rotation,
					elevation: elevation,
					distance: distance,
					picturePlane: picturePlane,
					offsetH: offsetH,
					offsetV: offsetV
				})
			);
		},
		[rotation, elevation, distance, picturePlane, offsetH, offsetV]
	);

	return (
		<div className="App">
			<GCView settings={{rotation: rotation, elevation: elevation, distance: distance, picturePlane: picturePlane, offsetH: offsetH, offsetV: offsetV}} />

			<div className="menu">
				<button onClick={toggleSettings}>{showSettings ? "Back" : "Settings"}</button>
			</div>
			
			{showSettings &&
			<div className={"settings"}>
				<h2>Perspektive Settings</h2>
				<GenericNumberInput label={"Rotation"} min={0} max={359} step={5} value={rotation} returnValue={(val) => handleRotation(val)} />
				<GenericNumberInput label={"Elevation"} min={0} max={90} step={5} value={elevation} returnValue={(val) => handleElevation(val)} />
				<GenericNumberInput label={"Distance"} min={0} max={999999} step={50} value={distance} returnValue={(val) => handleDistance(val)} />
				<GenericNumberInput label={"Distance to Picture Plane"} min={0} max={999999} step={50} value={picturePlane} returnValue={(val) => handlePicturePlane(val)} />
				<GenericNumberInput label={"Offset Horisontal"} min={0} max={999999} step={5} value={offsetH} returnValue={(val) => handleOffsetH(val)} />
				<GenericNumberInput label={"Offset Vertical"} min={0} max={999999} step={5} value={offsetV} returnValue={(val) => handleOffsetV(val)} />
			</div>}
		</div>
	);
}

export default App;
