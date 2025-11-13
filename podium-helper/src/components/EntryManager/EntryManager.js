import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchApiEntry } from "../../store/entries/entryActions";

//** STYLING */
import { Button, TextField } from "@mui/material";
import "../../Styling/entryManager.scss";

//** COMPONENTS */
import EntryTable from "./EntryTable";
import Series from "../Podium_Creation/Series";
import AddEntry from "./modal/AddEntry";
import EventSearch from "../EventsSearch";

//** Functions */
import searchAllEntries from "../../functions/searchAllEntries";
import { gtwca } from "../../functions/helperFunc";

//take in entries from state, run a filter to change return of entries and pass down to table
const EntryManager = () => {
    const data = useSelector((state) => state.entry.entriesArray);
    const [entries, setEntries] = useState(data);
    const [series, setSeries] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [eventOption, setEventOption] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setEntries(data);
    }, [data]);

    useEffect(() => {
        dispatch(fetchApiEntry());
    }, [dispatch]);

    const getValue = (event) => setEventOption(event.target.value);

    const sortEntries = (entries) => {
        const searchEntries = searchAllEntries(entries, searchValue, eventOption);
        // sorting when no series is selected
        if (!series || series === "All") {
            const entryObj = {};
            const entryArr = [];

            // create hash map with key vals of series and value of entries
            searchEntries.forEach((entry) => {
                const series = entry.series;
                entryObj[series] ? entryObj[series].push(entry) : (entryObj[series] = [entry]);
            });

            for (const series in entryObj) {
                const sorted = entryObj[series].sort((a, b) => a.number - b.number);
                if (series !== gtwca) entryArr.push(...sorted);
            }
            // check if entry arr includes gtwca entries, if so, put them at the start
            return entryObj[gtwca] ? [...entryObj[gtwca], ...entryArr] : entryArr;
        } else {
            //sort when series is selected
            const filtered = searchEntries.filter((entry) => entry.series === series);
            return filtered.sort((a, b) => a.number - b.number);
        }
    };

    return (
        <section id="entry_manager">
            <div className="entryManager_filter_container">
                <Button variant="outlined" onClick={() => setShowModal(!showModal)}>
                    Add Entry
                </Button>
                <EventSearch getValue={getValue} />
                <TextField
                    className="entryManager__search"
                    label="Search"
                    variant="outlined"
                    color="error"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                <Series getValue={(e) => setSeries(e.target.value.name)} comp="entryManager" />
            </div>
            <p>Num of Results: {sortEntries(entries).length}</p>
            <EntryTable entries={sortEntries(entries)} />
            <AddEntry show={showModal} handleToggle={() => setShowModal(!showModal)} />
        </section>
    );
};

export default EntryManager;
