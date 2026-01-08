import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchEvents } from "../../../store/events/eventActions";

const EventSelect = ({ entryEvent }) => {
	const currentYearEvents = useSelector((state) => state.events.currentYear);
	const dispatch = useDispatch();
	const [eventName, setEventName] = useState(entryEvent ? entryEvent : "");

	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);

	const handleChange = (e) => {
		setEventName(e.target.value);
	};

	const eventsWithFullSeason = [
		{
			name: "FULL SEASON ENTRY",
			date: "Oct 11",
			startDate: "11/3/2025",
			year: 2025,
		},
		...currentYearEvents,
	];

	return (
		<div className="dropdown" id="dropdown_event">
			<label htmlFor="dropdown">Events:</label>
			<select value={eventName} onChange={handleChange} name="event">
				<option value="" disabled>
					Select Event
				</option>
				{eventsWithFullSeason.map((event, index) => (
					<option value={event.name} key={index}>
						{event.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default EventSelect;
