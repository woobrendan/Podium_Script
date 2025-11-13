import DriverDetails from "./DriverDetails.js";
import "../../Styling/competitors.scss";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import BackToTopButton from "../BackToTopButton.js";
import ToggleSort from "./ToggleSort.js";
import searchAllEntries from "../../functions/searchAllEntries.js";
import { fetchApiEntry } from "../../store/entries/entryActions.js";
import NoResults from "../NoResults.js";
import { sortBySeries, sortByVehicleType, sortByManufacturer, sortByClass } from "../../functions/sortFuncs.js";
import { useDispatch, useSelector } from "react-redux";

const DriverSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const [option, setOption] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchApiEntry());
    }, [dispatch]);

    const entries = useSelector((state) => state.entry.entriesArray);

    const searchResult = searchAllEntries(entries, searchValue);

    const setSortOption = (sortOption, entryArray) => {
        const options = {
            Number: entryArray,
            Manufacturer: sortByManufacturer(entryArray),
            "Vehicle Type": sortByVehicleType(entryArray),
            Class: sortByClass(entryArray),
        };

        return options[sortOption] || sortBySeries(entryArray);
    };

    const mappedDrivers =
        searchResult.length > 0 ? (
            setSortOption(option, searchResult).map((entry, index) => (
                <DriverDetails entry={entry} key={index} index={index} />
            ))
        ) : (
            <NoResults />
        );

    return (
        <div className="competitors-container">
            <div className="search-sort-options">
                <ToggleSort getOption={(option) => setOption(option)} />
                <TextField
                    className="competitor_search"
                    label="Search"
                    variant="outlined"
                    color="error"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>
            <div className="entry_cards">{mappedDrivers}</div>
            <BackToTopButton />
        </div>
    );
};

export default DriverSearch;
