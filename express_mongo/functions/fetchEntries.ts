import dotenv from "dotenv";
import axios from "axios";
import { ApiEntryInterface } from "../models/models";
import convertEntry from "./convertEntries";
import { get60DayOld } from "./helperFunc";

dotenv.config();

export const fetchApiEntries = async () => {
	try {
		const date = get60DayOld();
		const token = process.env.TKSPICE;
		const form = process.env.FORM_ID;
		const url = "https://api.webconnex.com/v2/public/search/tickets";

		const params = {
			product: "ticketspice.com",
			port: "443",
			formId: form,
			limit: "250",
			status: "completed",
			dateCreatedAfter: date,
		};

		const entries = await axios.get(url, {
			params,
			headers: {
				apiKey: token || "",
			},
		});

		// filter out lumiranks and incomplete transactions, then convert to usable data
		const combinedEntries = entries.data.data.reduce((result: any[], entry: ApiEntryInterface) => {
			if (entry["levelLabel"] === "EVENT ENTRY") {
				result.push(convertEntry(entry));
			}
			return result;
		}, []);

		return combinedEntries;
	} catch (err) {
		console.log("Error fetching api", err);
	}
};

//example of arrr convertEntries
//{
//    tk_id: 58219452,
//    event: 'FULL SEASON ENTRY',
//    created: '2023-12-12T22:08:14Z',
//    series: 'GT4 America',
//    class: 'Pro-Am',
//    number: '22',
//    team: 'TechSport Racing',
//    driver1firstName: 'Colin',
//    driver1lastName: 'Harrison',
//    driver1category: 'Silver',
//    driver1nationality: 'USA',
//    driver2firstName: 'Eric',
//    driver2lastName: 'Powell',
//    driver2category: 'Silver',
//    driver2nationality: 'USA',
//    car: 'Nissan Z GT4',
//    manufacturer: 'Nissan',
//    sponsors: ''
//  },
