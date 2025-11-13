import mongoose, { Document, Schema } from "mongoose";

interface Events {
	name: string;
	date: string;
	startDate: string;
	endDate: string;
	year: number;
}

export interface eventModel extends Events, Document {}

const eventSchema: Schema = new Schema({
	name: { type: String, required: true },
	date: { type: String, required: true },
	startDate: { type: String },
	endDate: { type: String },
	year: { type: Number, required: true },
});

export default mongoose.model<eventModel>("Event", eventSchema);
