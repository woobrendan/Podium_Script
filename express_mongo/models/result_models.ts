import { EntryInterface } from "./models";

export interface MultiFastLap {
	entry: EntryInterface;
	laptime: string;
	driver: string;
}

export interface MultiHardCharge {
	entry: EntryInterface;
	gain: number;
	startPos: number;
	class: string;
}

interface EntryResultInterfance {
	team: string;
	vehicle: string;
	number: string;
	driver1: string;
	driver2?: string;
	driver3?: string;
}

export interface ResultInterface {
	class: string;
	firstPlace: EntryResultInterfance;
	secondPlace?: EntryResultInterfance;
	thirdPlace?: EntryResultInterfance;
}

export interface FullResultInterface {
	series: string;
	date: string;
	event: string;
	fastLap1?: MultiFastLap;
	fastLap2?: MultiFastLap;
	fastLap3?: MultiFastLap;
	result1: ResultInterface;
	result2?: ResultInterface;
	result3?: ResultInterface;
	result4?: ResultInterface;
	hardCharge1?: MultiHardCharge;
	hardCharge2?: MultiHardCharge;
	hardCharge3?: MultiHardCharge;
}
