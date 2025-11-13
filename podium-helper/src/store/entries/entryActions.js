import axios from "axios";
import { entryActions } from "./entry_slice";
import { convertEntryFormat } from "../../functions/helperFunc";

export const fetchApiEntry = () => {
    return async (dispatch) => {
        try {
            const entries = await axios.get("http://localhost:2020/api/entries");
            const converted = entries.data.entry.map((entry) => convertEntryFormat(entry));

            for (const entry of converted) {
                dispatch(entryActions.addEntry(entry));
            }
        } catch (err) {
            console.error(err);
        }
    };
};

export const fetchEventEntries = (event) => {
    return async (dispatch) => {
        try {
            const eventEntries = await axios.get(`http://localhost:2020/api/entries/events/${event}`);
            const converted = eventEntries.data.entries.map((entry) => convertEntryFormat(entry));

            for (const entry of converted) {
                dispatch(entryActions.addEventEntries(entry));
            }
        } catch (err) {
            console.log("Error fetching event entries: ", err);
        }
    };
};

export const updateEntry = async (entry) => {
    try {
        axios.patch(`http://localhost:2020/api/entries/${entry._id}`, entry);
    } catch (error) {
        console.log("Error updating Entry", error);
    }
};

export const deleteEntry = async (entry) => {
    try {
        axios.delete(`http://localhost:2020/api/entries/${entry._id}`);
    } catch (error) {
        console.log("Error deleting Entry", error);
    }
};
