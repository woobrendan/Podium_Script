import { MenuItem } from "@mui/material";
import WinnerPodium from "../components/Podium_Creation/WinnerPodium";
import { gtam, gt4a, tcam, grCup, gtwca, igtc } from "./helperFunc";

//determine if entry is single or two drivers and return corresponding menu item
const numOfDriverMenuItem = (entry, index) => {
	const { driver1, driver2, driver3, number } = entry;

	const drivers = [driver1, driver2, driver3].filter(Boolean).map((driver) => driver.name);
	const driverStr = `#${number} ${drivers.join(" & ")}`;

	return (
		<MenuItem key={index} value={entry}>
			{driverStr}
		</MenuItem>
	);
};

//dynamically render appropriate amount of WinnerPodium components based on need per series class requirements
const numOfPodiumDisplays = (series, submit) => {
	const mappedSeries = series.class.map((classification, index) => (
		<WinnerPodium
			key={classification}
			seriesName={series.name}
			onClick={submit}
			classification={classification}
			resultNum={index + 1}
		/>
	));
	return mappedSeries;
};

//take in entry object and get every single driver into list. List is used for Fast Lap component
const singleDrivers = (entryArray, seriesVal) => {
	const drivers = entryArray
		.filter((entry) => entry.series === seriesVal.name)
		.flatMap((entry) => {
			const { number, vehicle, driver1, driver2, driver3 } = entry;

			return [
				{ number, driver: driver1.name, vehicle },
				...(driver2 ? [{ number, driver: driver2.name, vehicle }] : []),
				...(driver3 ? [{ number, driver: driver3.name, vehicle }] : []),
			];
		});
	return drivers.sort((a, b) => a.number - b.number);
};

// used for awards to get class array in conatiners
const getClassArr = (series) => {
	switch (series.name) {
		case gtam:
			return series.class.slice(0, -1);
		case tcam:
			return series.class;
		case gt4a:
			return ["GT4"];
		case grCup:
			return ["Am"];
		case "McLaren Trophy":
			return ["McLaren"];
		case "Intercontingental GT Challenge":
			return ["IGTC"];
		default:
			return ["GT3"];
	}
};

// for awards, take in event entries,and return filtering by class. GTWCand  GT4return  all entries in series
const getAwardEntries = (entries, series, classif) => {
	if (series.name === gtwca || series.name === gt4a || series.name == "McLaren Trophy" || series.name === igtc) {
		return entries.filter((entry) => entry.series === series.name);
	} else {
		return entries.filter((entry) => entry.series === series.name && entry.classification === classif);
	}
};

export { numOfDriverMenuItem, numOfPodiumDisplays, singleDrivers, getClassArr, getAwardEntries };
