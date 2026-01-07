import { ApiEntryInterface } from "../models/models";
import {
	labels,
	convertClassif,
	getFieldPathVal,
	getDriverName,
	getManuf,
	carTypes,
	vehicles,
	convertSeries,
} from "./convertFuncs";

// Takes in entries from webconnex api and converts it into usable object
const convertEntry = (entry: ApiEntryInterface) => {
	let newEntry: { [key: string]: any } = {
		tk_id: entry.id,
		event: entry.eventLabel,
		created: entry.dateCreated,
	};

	const carPathSet = new Set(["tcCarMakeModel", "gt4aCarMakeModel", "gtaCarMakeModel", "gtwcCarMakemodel"]);

	for (const label of labels) {
		for (const field of entry.fieldData) {
			const basePath = field.path.split(".")[0];

			if (label === "Championship / Class" && field.path.includes("carType.")) {
				newEntry["class"] = convertClassif(field.label);
				break;
			}

			if (
				(label === "driver1" && field.path.includes("primaryDriverName.")) ||
				(label === "driver2" && field.path.includes("2ndDriverName2."))
			) {
				newEntry = getDriverName(label, field, newEntry);
				break;
			}

			// handle logic where raw data is contained in key 'path'
			if (
				(label === "driver1nationality" && field.path.includes("nationality2.")) ||
				(label === "driver2nationality" && field.path.includes("nationality32.")) ||
				(label === "team" && field.path.includes("temName.")) ||
				(label === "team" && field.path.includes("teamName2."))
			) {
				newEntry[label] = getFieldPathVal(field);
				break;
			}

			if (
				(label === "driver1category" && field.path.includes("fiaDriverCategorization.")) ||
				(label === "driver2category" && field.path.includes("fiaDriverCategorization2.")) ||
				(label === "team" && field.path.includes("temName."))
			) {
				newEntry[label] = field.label;
				break;
			}

			// if (label === "car" && carTypes.includes(field.label)) {
			// 	const carVal = field.value as string;
			// 	const car = vehicles[carVal] || `${carVal} not in vehicle list`;
			// 	newEntry.car = car;
			// 	newEntry.manufacturer = getManuf(car);
			// 	break;
			// }

			// handles new for 2026 logic regarding getting the vehicle value and manuf
			if (label === "car" && carPathSet.has(basePath)) {
				const car = field.label;
				newEntry[label] = car;
				newEntry.manufacturer = getManuf(car);
				break;
			}

			if (label === field.label) {
				const fieldVal = field.value as string;
				if (label === "Championship / Class") {
					newEntry["class"] = convertClassif(fieldVal);
					break;
				}
				if (label === "Team Sponsors - Please seperate each Sponsor with a comma") {
					newEntry.sponsors = fieldVal;
					break;
				}
				if (label === "Car Series") {
					const series = convertSeries(fieldVal);
					newEntry.series = series;
					if (series === "Toyota GR Cup") {
						newEntry.car = "Toyota GR86";
						newEntry.manufacturer = "Toyota";
					}
					break;
				}
				if (label === "Registered Car #") {
					newEntry.number = fieldVal;
					break;
				}
			}
		}
	}

	if (newEntry.series === "TC America") {
		newEntry["class"] = "TC";
	}

	if (newEntry.series === "Toyota GR Cup") {
		newEntry["class"] = "Am";
	}

	return newEntry;
};

export default convertEntry;
