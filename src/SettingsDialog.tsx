import React from "react";
import GCEngine, {Settings} from "./GCEngine";
import {GenericNumberInput} from "./GenericNumberInput";

export class SettingsDialog {
    private _settings: Settings;
    constructor() {
        this._settings = GCEngine.getSettings();
    }

    public get settings() {
        return this._settings;
    }

    public handleSettings = (key: string, value: number) => {
        if (this._settings) {
            let settingsCopy: Settings = {...this._settings};
            switch (key) {
                case "rotation": settingsCopy.rotation = value; break;
                case "elevation": settingsCopy.elevation = value; break;
                case "distance": settingsCopy.distance = value; break;
                case "picturePlane": settingsCopy.picturePlane = value; break;
                case "offsetH": settingsCopy.offsetH = value; break;
                case "offsetV": settingsCopy.offsetV = value; break;
            }
            GCEngine.setSettings(settingsCopy);
            this._settings = settingsCopy;
        }
    }
}

export interface SettingsDialogFCProps {
    instance: SettingsDialog;
    killInstance: () => void;
}

export const SettingsDialogFC: React.FC<SettingsDialogFCProps> = (props) => {
    const {instance} = props;
    return (
        <div className={"dialog"} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
            <h2>Perspektive Settings</h2>
            <GenericNumberInput label={"Rotation"} min={0} max={359} step={5} value={instance.settings.rotation} returnValue={(val) => instance.handleSettings("rotation", val)} />
            <GenericNumberInput label={"Elevation"} min={-90} max={90} step={5} value={instance.settings.elevation} returnValue={(val) => instance.handleSettings("elevation", val)} />
            <GenericNumberInput label={"Distance"} min={0} max={999999} step={50} value={instance.settings.distance} returnValue={(val) => instance.handleSettings("distance", val)} />
            <GenericNumberInput label={"Distance to Picture Plane"} min={0} max={999999} step={50} value={instance.settings.picturePlane} returnValue={(val) => instance.handleSettings("picturePlane", val)} />
            <GenericNumberInput label={"Offset Horisontal"} min={0} max={999999} step={5} value={instance.settings.offsetH} returnValue={(val) => instance.handleSettings("offsetH", val)} />
            <GenericNumberInput label={"Offset Vertical"} min={0} max={999999} step={5} value={instance.settings.offsetV} returnValue={(val) => instance.handleSettings("offsetV", val)} />
        </div>
    );
}
