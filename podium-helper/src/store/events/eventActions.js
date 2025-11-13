import axios from "axios";
import { eventActions } from "./eventSlice";

export const fetchEvents = () => {
	return async (dispatch) => {
		try {
			const events = await axios.get("http://localhost:2020/api/events");

			const year = new Date().getFullYear();

			const currentEvents = events.data.events.filter((event) => event.year === year);

			dispatch(eventActions.setEvents(events.data.events));
			dispatch(eventActions.setCurrentYear(currentEvents));
		} catch (err) {
			console.log("Error fetching Events: ", err);
		}
	};
};
