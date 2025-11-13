const printPage = () => {
	window.print();
};

const compareDate = (a, b) => {
	if (a.date < b.date) {
		return 1;
	}
	if (a.date > b.date) {
		return -1;
	}
	return 0;
};

const compareCarNumber = (a, b) => {
	if (Number(a.number) < Number(b.number)) {
		return -1;
	}
	if (Number(a.number) > Number(b.number)) {
		return 1;
	}
	return 0;
};

const shortenName = (seriesName) => {
	const obj = {
		"GT World Challenge America": "GTWCA",
		"GT America": "GTA",
		"TC America": "TCAM",
		"Pirelli GT4 America": "PGT4A",
		"GT4 America": "PGT4A",
		"Toyota GR Cup": "GR Cup",
		"Intercontinental GT Challenge": "IGTC",
		"McLaren Trophy": "MTA",
	};
	return obj[seriesName];
};

//used for results in resulttablebody
const getPlaceString = (num) => {
	const place = {
		0: "1st",
		1: "2nd",
		2: "3rd",
	};

	return place[num];
};

const convertDriver = (apiEntry, driverNum, series) => {
	const driver = `driver${driverNum}`;
	let rating = apiEntry[`${driver}category`];

	if (!rating) {
		if (series === "TC America" || series === "Toyota GR Cup") {
			rating = "N/A";
		} else {
			rating = "Bronze";
		}
	}
	const driverInfo = {
		[driver]: {
			name: `${apiEntry[`${driver}firstName`]} ${apiEntry[`${driver}lastName`]}`,
			nationality: apiEntry[`${driver}nationality`],
			rating,
		},
	};

	return driverInfo;
};

const convertEntryFormat = (apiEntry) => {
	const { _id, team, number, series, driver2firstName, driver3firstName, car, created, event } = apiEntry;

	const oldEntryFormat = {
		_id,
		team,
		number,
		event,
		series: series === "GT4 America" ? "Pirelli GT4 America" : series,
		...convertDriver(apiEntry, 1, series),
		...(driver2firstName ? convertDriver(apiEntry, 2, series) : {}),
		...(driver3firstName ? convertDriver(apiEntry, 3, series) : {}),
		vehicle: car,
		classification: apiEntry.class,
		year: created.split("-")[0],
		carImage: "",
		created: apiEntry.created,
		sponsors: apiEntry.sponsors,
	};

	return oldEntryFormat;
};

const gtwca = "GT World Challenge America";
const tcam = "TC America";
const gtam = "GT America";
const gt4a = "Pirelli GT4 America";
const igtc = "Intercontinental GT Challenge";
const grCup = "Toyota GR Cup";
const mta = "McLaren Trophy";

export {
	printPage,
	compareDate,
	compareCarNumber,
	gtwca,
	tcam,
	gtam,
	gt4a,
	igtc,
	grCup,
	mta,
	shortenName,
	getPlaceString,
	convertEntryFormat,
};
