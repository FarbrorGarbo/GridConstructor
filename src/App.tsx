import React from "react";
import GridConstructor from './GridConstructor';
import "./App.css";

// const useSettings: React.FC<{ init?: string }> = (init) => {
//   const localStorageData: string | null = localStorage.getItem("grid");
//   const [value, setValue] = React.useState<any>(
//       !localStorageData ? {} || init
//     );
//   React.useEffect(
//     () => {
//       localStorage.setItem("grid", JSON.stringify(value));
//     }
//   )
//   return [value, setValue];
// }

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
	// Show/hide settings
	const [showSettings, toggle] = React.useState(false);

	function toggleSettings (event: any) {
		event.preventDefault();
		toggle(!showSettings);
	}

	// Settings
	const [rotation, setRotation] = React.useState(25);
	const [elevation, setElevation] = React.useState(20);
	const [distance, setDistance] = React.useState(1000);
	const [picturePlane, setPicturePlane] = React.useState(1000);
	const [offsetH, setOffsetH] = React.useState(Math.floor(window.innerWidth/2));
	const [offsetV, setOffsetV] = React.useState(Math.floor(window.innerHeight/2));

	const handleRotation = (value: number) => { setRotation(value) };
	const handleElevation = (value: number) => { setElevation(value) };
	const handleDistance = (value: number) => { setDistance(value) };
	const handlePicturePlane = (value: number) => { setPicturePlane(value) };
	const handleOffsetH = (value: number) => { setOffsetH(value) };
	const handleOffsetV = (value: number) => { setOffsetV(value) };

	// React.useEffect( () => { console.log(rotation)}, [rotation]);
	// React.useEffect( () => { console.log(elevation)}, [elevation]);

	return (
		<div className="App">
			<GridConstructor settings={{rotation: rotation, elevation: elevation, distance: distance, picturePlane: picturePlane, offsetH: offsetH, offsetV: offsetV}} />
			{showSettings &&
			<div className={"settings"}>
				<button onClick={toggleSettings}>{showSettings ? "Close" : "Settings"}</button>
				<h2>Perspektive Settings</h2>
				<GenericNumberInput label={"Rotation"} min={0} max={359} step={5} value={rotation} returnValue={(val) => handleRotation(val)} />
				<GenericNumberInput label={"Elevation"} min={0} max={90} step={5} value={elevation} returnValue={(val) => handleElevation(val)} />
				<GenericNumberInput label={"Distance"} min={0} max={999999} step={50} value={distance} returnValue={(val) => handleDistance(val)} />
				<GenericNumberInput label={"Distance to Picture Plane"} min={0} max={999999} step={50} value={picturePlane} returnValue={(val) => handlePicturePlane(val)} />
				<GenericNumberInput label={"Offset Horisontal"} min={0} max={999999} step={5} value={offsetH} returnValue={(val) => handleOffsetH(val)} />
				<GenericNumberInput label={"Offset Vertical"} min={0} max={999999} step={5} value={offsetV} returnValue={(val) => handleOffsetV(val)} />
			</div>}
			{!showSettings && <button onClick={toggleSettings}>{showSettings ? "Close" : "Settings"}</button>}
		</div>
	);
}

export default App;
