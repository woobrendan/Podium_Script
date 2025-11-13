import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
    name: "series",
    initialState: {
        seriesArr: [],
    },
    reducers: {
        setSeries(state, action) {
            state.seriesArr = action.payload;
        },
    },
});

export const seriesActions = seriesSlice.actions;

export default seriesSlice;
