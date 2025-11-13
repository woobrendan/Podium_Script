import mongoose, { Document, Schema } from "mongoose";
import { ConvertedApiEntry } from "./models";

export interface ApiEntryModel extends Document, ConvertedApiEntry {}

const apiEntrySchema: Schema = new Schema({
	tk_id: { type: Number },
	event: { type: String, required: true },
	created: { type: String, required: true },
	series: { type: String, required: true },
	class: { type: String, required: true },
	number: { type: String, required: true },
	team: { type: String, required: true },
	driver1firstName: { type: String, required: true },
	driver1lastName: { type: String, required: true },
	driver1category: { type: String },
	driver1nationality: { type: String },
	driver2firstName: { type: String },
	driver2lastName: { type: String },
	driver2category: { type: String },
	driver2nationality: { type: String },
	driver3firstName: { type: String },
	driver3lastName: { type: String },
	driver3category: { type: String },
	driver3nationality: { type: String },
	car: { type: String, required: true },
	manufacturer: { type: String, required: true },
	sponsors: { type: String },
});

export default mongoose.model<ApiEntryModel>("ApiEntries", apiEntrySchema);
export { apiEntrySchema };
