import { createSlice } from "@reduxjs/toolkit";
import { addResultToDB } from "./resultsActions";

const resultsSlice = createSlice({
    name: "results",
    initialState: {
        resultsArray: [],
        recentPodium: null,
    },
    reducers: {
        setResultHistory(state, action) {
            state.resultsArray = action.payload;
        },

        addResults(state, action) {
            const result = action.payload;
            state.resultsArray.push({
                ...result,
            });
            state.recentPodium = result;
            addResultToDB(result);
        },

        setRecentPodium(state, action) {
            state.recentPodium = action.payload;
        },
        editresults(state, action) {},
    },
});

export const resultsActions = resultsSlice.actions;

export default resultsSlice;
