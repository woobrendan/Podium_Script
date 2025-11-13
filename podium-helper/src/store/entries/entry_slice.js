import { createSlice } from "@reduxjs/toolkit";
import { deleteEntry, updateEntry } from "./entryActions";

const entrySlice = createSlice({
    name: "entries",
    initialState: {
        entriesArray: [],
        eventEntries: [],
    },
    reducers: {
        addEntry(state, action) {
            const existingEntry = state.entriesArray.find((entry) => entry._id === action.payload._id);
            if (!existingEntry) {
                state.entriesArray = [...state.entriesArray, action.payload];
            }
        },

        addEventEntries(state, action) {
            const existingEntry = state.eventEntries.find((entry) => entry._id === action.payload._id);
            if (!existingEntry) {
                state.eventEntries = [...state.eventEntries, action.payload];
            }
        },

        removeEntry(state, action) {
            const entries = [...state.entriesArray];
            const adjusted = entries.filter((entry) => entry._id !== action.payload._id);
            state.entriesArray = adjusted;
            deleteEntry(action.payload);
        },

        updateEntry(state, action) {
            updateEntry(action.payload);
            const entries = [...state.entriesArray];
            const newEntries = entries.map((entry) =>
                entry._id === action.payload._id ? { ...action.payload } : entry,
            );

            state.entriesArray = [...newEntries];
        },
    },
});

export const entryActions = entrySlice.actions;

export default entrySlice;
