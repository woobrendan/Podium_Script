import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import ResultTableHeader from "./ResultTableHeader.js";
import SearchAllResults from "./functions/searchAllResults.js";
import BackToTopButton from "../BackToTopButton.js";
import EventSearch from "../EventsSearch.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllResults } from "../../store/results/resultsActions";

const ResultsHistory = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [event, setEvent] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const results = useSelector((state) => state.results.resultsArray);

    const getValue = (event) => setEvent(event.target.value);

    useEffect(() => {
        dispatch(fetchAllResults());
    }, [dispatch]);

    useEffect(() => {
        event ? setFilteredResults(results.filter((result) => event === result.event)) : setFilteredResults(results);
    }, [event, results]);

    return (
        <section className="result-container">
            <h1>Result History</h1>
            <div className="filter-details">
                <EventSearch getValue={getValue} component="result" />
                <TextField
                    className="result_search"
                    label="Search"
                    variant="outlined"
                    color="error"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>
            <div className="result-history-list">
                {SearchAllResults(filteredResults, searchValue).map((result, index) => (
                    <ResultTableHeader results={result} key={index} />
                ))}
            </div>
            <BackToTopButton />
        </section>
    );
};

export default ResultsHistory;
