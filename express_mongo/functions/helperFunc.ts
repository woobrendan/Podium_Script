import { ResultInterface, MultiHardCharge, MultiFastLap } from "../models/result_models";
import { ConvertedApiEntry, DriverInfo } from "../models/models";

const resultBuilder = (result: ResultInterface) => {
	const { firstPlace, secondPlace, thirdPlace } = result;
	return {
		...result,
		firstPlace: { ...firstPlace },
		...(secondPlace ? { secondPlace: { ...secondPlace } } : {}),
		...(thirdPlace ? { thirdPlace: { ...thirdPlace } } : {}),
	};
};

const hardChargeResult = (result: MultiHardCharge) => {
	const { entry } = result;
	return {
		...result,
		entry: {
			...entry,
			driver1: {
				...entry.driver1,
			},
			...(entry.driver2 ? { driver2: { ...entry.driver2 } } : {}),
			...(entry.driver3 ? { driver3: { ...entry.driver3 } } : {}),
		},
	};
};

const fastLapResult = (result: MultiFastLap) => {
	const { entry } = result;
	return {
		...result,
		entry: {
			...entry,
			driver1: {
				...entry.driver1,
			},
			...(entry.driver2 ? { driver2: { ...entry.driver2 } } : {}),
			...(entry.driver3 ? { driver3: { ...entry.driver3 } } : {}),
		},
	};
};

const compareObjects = (db_entry: any, entry2: any): boolean => {
	for (const key in entry2) {
		if (db_entry[key] !== entry2[key]) {
			return false;
		}
	}
	return true;
};

const entriesByEvent = (entries: ConvertedApiEntry[]) => {
	const events: { [key: string]: ConvertedApiEntry[] } = {
		"FULL SEASON ENTRY": [],
		"Arlington Grand Prix": [],
		"Sonoma Raceway": [],
		"Circuit of the Americas": [],
		"Miami Grand Prix": [],
		"Sebring International Raceway": [],
		"Road Atlanta": [],
		"Road America": [],
		"Barber Motorsports Park": [],
		"Indianapolis Motor Speedway": [],
	};

	for (const entry of entries) {
		events[entry.event].push(entry);
	}

	return events;
};

const getDriverName = (name: string, val: string): string => {
	const nameArr = name.split(" ");
	return val === "first" ? nameArr[0] : nameArr.slice(1).join(" ");
};

const getDriverInfo = (driver: DriverInfo, driverNum: Number) => {
	const driverString = `driver${driverNum}`;
	const keys = ["firstName", "lastName", "category", "nationality"];
	const values = [
		getDriverName(driver.name, "first"),
		getDriverName(driver.name, "last"),
		driver.rating,
		driver.nationality,
	];

	const driverInfo: { [key: string]: string } = Object.fromEntries(
		keys.map((key, i) => [`${driverString}${keys[i]}`, values[i]])
	);

	return driverInfo;
};

const getManuf = (vehicle: string): string => {
	return vehicle.includes("Aston") ? "Aston Martin" : vehicle.split(" ")[0];
};

const get60DayOld = (): Date => {
	let date = new Date();

	date.setDate(date.getDate() - 60);
	return date;
};

export {
	resultBuilder,
	hardChargeResult,
	compareObjects,
	entriesByEvent,
	getDriverInfo,
	getManuf,
	fastLapResult,
	get60DayOld,
};
