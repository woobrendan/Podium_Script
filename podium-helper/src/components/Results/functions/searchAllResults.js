import { compareResultDates } from "../../../functions/sortFuncs";

// Get all drivers from one result (all classes, one series, one race)
const allDrivers = (placementArr) => {
    const driverArray = [];
    const filtered = placementArr.filter(Boolean);

    for (const result of filtered) {
        driverArray.push(result.driver1);
        if (result.driver2) driverArray.push(result.driver2);
        if (result.driver3) driverArray.push(result.driver3);
    }
    return driverArray;
};

const SearchAllResults = (list, searchValue) => {
    if (!searchValue) {
        return list;
    }

    const lowerVal = searchValue.toLowerCase().trim();

    //** begin filtering every result, where val is a full podium result */
    const filtered = list.filter((val) => {
        const { result1, result2, result3, result4, series, event } = val;

        const allPlacements = [
            result1.firstPlace,
            result1.secondPlace,
            result1.thirdPlace,
        ];

        const resultsArr = [result2, result3, result4].filter(Boolean);

        for (const result of resultsArr) {
            const { firstPlace, secondPlace, thirdPlace } = result;
            allPlacements.push(firstPlace, secondPlace, thirdPlace);
        }

        const checkField = (field) => field.toLowerCase().includes(lowerVal);

        // filter through the entry object, keying into the obj using the category variable
        const categoryArray = (category) => {
            const newArray = [];
            for (const placeResult of allPlacements) {
                if (placeResult) newArray.push(placeResult[category]);
            }
            return newArray;
        };

        const fieldsToCheck = [
            series.toLowerCase(),
            event.toLowerCase(),
            // spreads an array of all driver names, all vehicles etc
            ...allDrivers(allPlacements).map((driver) => driver.toLowerCase()),
            ...categoryArray("vehicle").map((vehicle) => vehicle.toLowerCase()),
            ...categoryArray("team").map((team) => team.toLowerCase()),
            ...categoryArray("number"),
        ];

        return fieldsToCheck.some((field) => checkField(field));
    });
    return filtered.sort(compareResultDates);
};

export default SearchAllResults;
