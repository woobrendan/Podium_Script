import { useState } from "react";
import { shortenName } from "../../../functions/helperFunc";
import vehicles from "./vehicles";

const VehicleList = ({ series, vehicleName, classif, onChange }) => {
	const [vehicle, setVehicle] = useState(vehicleName ? vehicleName : "");

	const handleChange = (e) => {
		setVehicle(e.target.value);
		onChange(e);
	};

	const getAllSeriesVehicles = (series) => {
		const vehObj = vehicles[series];
		const allVehicles = [];
		for (const key in vehObj) {
			allVehicles.push(...vehObj[key]);
		}
		return allVehicles;
	};

	//take in long hand of series name
	const getVehicleArr = (seriesName) => {
		const series = shortenName(seriesName);
		const vehicleStr = vehicles[series];

		if (series === "GTWCA" || series === "PGT4A" || series === "IGTC" || series === "TCAM") {
			return vehicleStr;
		} else if (series === "GR Cup") {
			return ["Toyota GR86"];
		} else if (series === "MTA") {
			return ["McLaren Artura Trophy EVO"];
		} else {
			return classif ? vehicles[series][classif] : getAllSeriesVehicles(series);
		}
	};

	return (
		<div className="dropdown" id="dropdown_vehicle">
			<label htmlFor="dropdown">Vehicle:</label>
			<select value={vehicle} onChange={handleChange} name="vehicle">
				<option value="" disabled>
					Select Car
				</option>
				{getVehicleArr(series, classif).map((vehicleString, index) => (
					<option value={vehicleString} key={index}>
						{vehicleString}
					</option>
				))}
			</select>
		</div>
	);
};

export default VehicleList;
