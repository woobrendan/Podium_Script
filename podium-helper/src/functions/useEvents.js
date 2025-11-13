import { useState, useEffect } from "react";
//import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../store/events/eventActions";

const useEvents = () => {
	const [currentEventName, setCurrentEventName] = useState("");
	const currentYearEvents = useSelector((state) => state.events.currentYear);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);

	useEffect(() => {
		if (currentYearEvents && currentYearEvents.length > 0) {
			const sortedEvents = [...currentYearEvents].sort(
				(a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
			);

			setCurrentEventName(getCurrentEvent(sortedEvents));
		}
	}, [currentYearEvents]);

	const getCurrentEvent = (events) => {
		const today = new Date();
		let currentEvent = null;

		for (let i = 0; i < events.length; i++) {
			const eventStartDate = new Date(events[i].startDate);
			const eventEndDate = new Date(events[i].endDate);

			// Check if today is between the start and end date of the event
			if (today >= eventStartDate && today <= eventEndDate) {
				currentEvent = events[i].name;
				break;
			}

			// Check if today is before or equal to start date
			if (today <= eventStartDate) {
				// Check if today is not past start of next event, and isn't the last event
				if (i < events.length - 1) {
					const nextEventStartDate = new Date(events[i + 1].startDate);

					if (today < nextEventStartDate) {
						currentEvent = events[i].name;
						break;
					}
				} else {
					// Returns last event
					currentEvent = events[i].name;
				}
			}
		}
		return currentEvent;
	};

	return { currentEventName };
};

export default useEvents;
