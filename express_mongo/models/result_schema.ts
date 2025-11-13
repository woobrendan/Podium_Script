import mongoose, { Document, Schema } from "mongoose";
import { FullResultInterface } from "./result_models";
import { entrySchema } from "./entry_schema";

export interface ResultModel extends FullResultInterface, Document {}

const resultSchema: Schema = new Schema({
	series: { type: String, required: true },
	date: { type: String, required: true },
	event: { type: String, required: true },
	fastLap1: {
		driver: { type: String },
		entry: { type: entrySchema },
		laptime: { type: String },
	},
	fastLap2: {
		driver: { type: String },
		entry: { type: entrySchema },
		laptime: { type: String },
	},
	fastLap3: {
		driver: { type: String },
		entry: { type: entrySchema },
		laptime: { type: String },
	},
	hardCharger: {
		entry: { type: entrySchema },
		gain: { type: Number },
		startPos: { type: Number },
	},
	hardCharge1: {
		entry: { type: entrySchema },
		gain: { type: Number },
		startPos: { type: Number },
		class: { type: String },
	},
	hardCharge2: {
		entry: { type: entrySchema },
		gain: { type: Number },
		startPos: { type: Number },
		class: { type: String },
	},
	hardCharge3: {
		entry: { type: entrySchema },
		gain: { type: Number },
		startPos: { type: Number },
		class: { type: String },
	},
	result1: {
		class: { type: String, required: true },
		firstPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		secondPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		thirdPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
	},
	result2: {
		class: { type: String },
		firstPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		secondPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		thirdPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
	},
	result3: {
		class: { type: String },
		firstPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		secondPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		thirdPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
	},
	result4: {
		class: { type: String },
		firstPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		secondPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
		thirdPlace: {
			driver1: { type: String },
			driver2: { type: String },
			driver3: { type: String },
			vehicle: { type: String },
			team: { type: String },
			number: { type: String },
		},
	},
});

export default mongoose.model<ResultModel>("Result", resultSchema);
