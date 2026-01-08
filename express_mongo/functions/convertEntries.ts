import { ApiEntryInterface } from "../models/models";
import { labels, convertClassif, getFieldPathVal, getDriverName, getManuf, convertSeries } from "./convertFuncs";

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
				(label === "team" && field.path.includes("teamName2."))
			) {
				newEntry[label] = getFieldPathVal(field);
				break;
			}

			if (
				(label === "driver1category" && field.path.includes("fiaDriverCategorization.")) ||
				(label === "driver2category" && field.path.includes("fiaDriverCategorization2."))
			) {
				newEntry[label] = field.label;
				break;
			}

			// handles new for 2026 logic regarding getting the vehicle value and manuf
			if (label === "car" && field.value === "true" && carPathSet.has(basePath)) {
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
						newEntry["class"] = "Am";
					}
					if (series === "TC America") {
						newEntry["class"] = "TC";
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

	return newEntry;
};

export default convertEntry;

// {
// 	id: 103762038,
// 	displayId: '01KBDMT1HH297QMPJJT',
// 	formId: 909657,
// 	formName: '2026 SRO Motorsports Entry',
// 	formAccRef: '2026SRMTRSPRT',
// 	orderCustomerId: 765460,
// 	customerId: 11504992,
// 	orderId: 69653136,
// 	orderDisplayId: '01KBDMT1HACVB14AYDA',
// 	orderNumber: '2026SRMTRSPRTKLM000Z',
// 	orderEmail: 'racing@autotechnic.net',
// 	levelLabel: 'EVENT ENTRY',
// 	levelKey: 'adult',
// 	amount: '44240.00',
// 	fee: '0.00',
// 	total: '47600.67',
// 	currency: 'USD',
// 	status: 'completed',
// 	fieldData: [
// 	  { amount: '0', label: 'Fee', path: 'fee' },
// 	  { label: 'Car Series', path: 'carClass', value: 'gtsSprintx' },
// 	  {
// 		amount: '0',
// 		label: 'GT4 America',
// 		path: 'carClass.gtsSprintx',
// 		value: 'true'
// 	  },
// 	  {
// 		label: 'Championship / Class',
// 		path: 'multipleChoice',
// 		value: 'proAm'
// 	  },
// 	  {
// 		amount: '0',
// 		label: 'Pro-Am',
// 		path: 'multipleChoice.proAm',
// 		value: 'true'
// 	  },
// 	  {
// 		label: 'Registered Car #',
// 		path: 'pwcRegisteredCarNumber',
// 		value: '19'
// 	  },
// 	  {
// 		label: 'Is this car registered with the RaceSelect program for 2026?',
// 		path: 'thisCarRegisteredWith',
// 		value: 'no'
// 	  },
// 	  {
// 		amount: '0',
// 		label: 'No',
// 		path: 'thisCarRegisteredWith.no',
// 		value: 'true'
// 	  },
// 	  { label: 'Team Name', path: 'teamName2' },
// 	  {
// 		label: 'Auto Technic Racing',
// 		path: 'teamName2.Auto Technic Racing',
// 		value: 'true'
// 	  },
// 	  { label: 'GT4 Car Make / Model', path: 'gt4aCarMakeModel' },
// 	  {
// 		label: 'BMW G82 M4 GT4 EVO',
// 		path: 'gt4aCarMakeModel.BMW G82 M4 GT4 EVO',
// 		value: 'true'
// 	  },
// 	  { label: 'Car Year', path: 'carYear', value: '2024' },
// 	  {
// 		label: 'Team Sponsors - Please seperate each Sponsor with a comma',
// 		path: 'teamSponsors',
// 		value: 'JAG NY, AutoTechnic Racing, BMW of Ridgefield, '
// 	  },
// 	  { label: 'Primary Driver Name', path: 'primaryDriverName' },
// 	  {
// 		label: 'Roland Krainz',
// 		path: 'primaryDriverName.Roland Krainz',
// 		value: 'true'
// 	  },
// 	  { label: 'PRIMARY DRIVER NATIONALITY', path: 'nationality2' },
// 	  { label: 'AUT', path: 'nationality2.AUT', value: 'true' },
// 	  {
// 		label: 'FIA Driver Categorization',
// 		path: 'fiaDriverCategorization',
// 		value: 'multipleChoiceOption'
// 	  },
// 	  {
// 		amount: '0',
// 		label: 'Bronze',
// 		path: 'fiaDriverCategorization.multipleChoiceOption',
// 		value: 'true'
// 	  },
// 	  {
// 		label: 'Bronze Test At This Event?',
// 		path: 'bronzeTestAtThis',
// 		value: 'yesWillParticipateIn'
// 	  },
// 	  {
// 		amount: '1750',
// 		label: 'YES - Primary Driver Will Participate In Bronze Test',
// 		path: 'bronzeTestAtThis.yesWillParticipateIn',
// 		value: 'true'
// 	  },
// 	  {
// 		label: 'Driver Email',
// 		path: 'driverEmail',
// 		value: 'Roland@krainzcreations.com'
// 	  },
// 	  { label: 'Driver Cell', path: 'driverCell', value: '+13472478399' },
// 	  { label: '2nd Driver Name', path: '2ndDriverName2' },
// 	  {
// 		label: 'Stevan McAleer',
// 		path: '2ndDriverName2.Stevan McAleer',
// 		value: 'true'
// 	  },
// 	  {
// 		label: 'FIA Driver Categorization',
// 		path: 'fiaDriverCategorization2',
// 		value: 'c'
// 	  },
// 	  {
// 		amount: '0',
// 		label: 'Gold',
// 		path: 'fiaDriverCategorization2.c',
// 		value: 'true'
// 	  },
// 	  {
// 		label: 'Bronze Test At This Event?',
// 		path: 'bronzeTestAtThis2',
// 		value: 'no2ndDriverWill'
// 	  },
// 	  {
// 		amount: '0',
// 		label: 'NO - 2nd Driver Will Not Participate In Bronze Test',
// 		path: 'bronzeTestAtThis2.no2ndDriverWill',
// 		value: 'true'
// 	  },
// 	  { label: '2nd Driver Nationality', path: 'nationality32' },
// 	  { label: 'SCO', path: 'nationality32.SCO', value: 'true' },
// 	  {
// 		label: '2nd Driver Email',
// 		path: '2ndDriverEmail',
// 		value: 'stevanmcaleer43@hotmail.com'
// 	  },
// 	  {
// 		label: '2nd Driver Cell',
// 		path: '2ndDriverCell',
// 		value: '+18452603007'
// 	  }
// 	],
// 	eventLabel: 'FULL SEASON ENTRY',
// 	metadata: null,
// 	sourceType: 'standard',
// 	dateCreated: '2025-12-01T19:04:09Z',
// 	dateUpdated: '2025-12-01T19:04:12Z'
//   }
