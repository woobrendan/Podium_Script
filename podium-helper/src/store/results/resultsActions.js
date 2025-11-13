import { resultsActions } from "./resultsSlice";
import axios from "axios";
import { compareResultDates } from "../../functions/sortFuncs";

export const fetchAllResults = () => {
    return async (dispatch) => {
        try {
            const results = await axios.get("http://localhost:2020/results");
            const recent = results.data.results[results.data.results.length - 1];
            const sortedResults = results.data.results.sort(compareResultDates);
            dispatch(resultsActions.setRecentPodium(recent));
            dispatch(resultsActions.setResultHistory(sortedResults));
        } catch (err) {
            console.log("Error fetching results:", err);
        }
    };
};

export const addResultToDB = async (results) => {
    try {
        await axios.post("http://localhost:2020/results", {
            results,
        });
    } catch (err) {
        console.log("Error:", err);
    }
};
