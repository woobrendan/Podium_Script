import { EntryModel } from "../models/entry_schema";
import { getManuf, getDriverInfo } from "../functions/helperFunc";

const convertOldtoNewEntry = (entry: EntryModel) => {
    const { _id, team, number, event, series, vehicle, classification, year, created, sponsors } = entry;
    // convert from old to new, then try to update again
    const newFormat = {
        _id,
        event,
        created,
        series,
        class: classification,
        number,
        team,
        car: vehicle,
        manufacturer: getManuf(vehicle),
        ...getDriverInfo(entry.driver1, 1),
        ...(entry.driver2?.name ? getDriverInfo(entry.driver2, 2) : {}),
        ...(entry.driver3?.name ? getDriverInfo(entry.driver3, 3) : {}),
        sponsors,
    };

    return newFormat;

    //pass update function to update controller
};

export default convertOldtoNewEntry;
