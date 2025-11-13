export interface DriverInfo {
	name: string;
	rating: string;
	nationality: string;
}

export interface EntryInterface {
	event: string;
	created: string;
	team: string;
	sponsors: string;
	vehicle: string;
	series: string;
	number: string;
	driver1: DriverInfo;
	driver2?: DriverInfo;
	driver3?: DriverInfo;
	classification: string;
	carImage: string;
	year: number;
}

export interface FieldData {
	amount?: string;
	label: string;
	path: string;
	value: string | boolean;
}

export interface ApiEntryInterface {
	id: number;
	displayId: string;
	formId: number;
	formName: string;
	formAccRef: string;
	orderCustomerId: number;
	customerId: number;
	orderId: number;
	orderDisplayId: string;
	orderNumber: string;
	orderEmail: string;
	levelLabel: string;
	levelKey: string;
	amount: string;
	fee: string;
	total: string;
	currency: string;
	status: string;
	fieldData: FieldData[];
	eventLabel: string;
	metadata: null | any;
	sourceType: string;
	dateCreated: Date;
	dateUpdated: Date;
}

export interface ConvertedApiEntry {
	tk_id: number;
	event: string;
	created: string;
	series: string;
	class: string;
	number: string;
	team: string;
	driver1firstName: string;
	driver1lastName: string;
	driver1category?: string;
	driver1nationality: string;
	driver2firstName?: string;
	driver2lastName?: string;
	driver2category?: string;
	driver2nationality?: string;
	driver3firstName?: string;
	driver3lastName?: string;
	driver3category?: string;
	driver3nationality?: string;
	car: string;
	manufacturer: string;
	sponsors: string;
}
