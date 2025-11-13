import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//** Style Sheets  */
import "../../Styling/podium.scss";
import "../../Styling/winnerTop3.scss";

//** Components  */
import Series from "./Series";
import EventSearch from "../EventsSearch";
import DatePicker from "./DatePicker";
import HardChargeContainer from "./hard_charger/HardChargeContainer";
import FastLapContainer from "./fast_lap/FastLapContainer";

import useEvents from "../../functions/useEvents";
import { getToday } from "../../functions/dateFuncs";
import mongoResult from "../../functions/formMongoResult";
import { resultsActions } from "../../store/results/resultsSlice";
import { numOfPodiumDisplays } from "../../functions/podiumResultHelpers";
import { fetchApiEntry, fetchEventEntries } from "../../store/entries/entryActions";

const Podium = () => {
	const { currentEventName } = useEvents();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const eventEntries = useSelector((state) => state.entry.eventEntries);

	const [results, setResults] = useState({
		date: getToday(),
		series: "",
		event: "",
	});

	useEffect(() => {
		if (currentEventName) {
			setResults((prev) => ({
				...prev,
				event: currentEventName,
			}));

			dispatch(fetchEventEntries(currentEventName));
			dispatch(fetchApiEntry());
		}
	}, [currentEventName, dispatch]);

	useEffect(() => {
		if (results.event) {
			dispatch(fetchEventEntries(results.event));
		}
	}, [results.event, dispatch]);

	const handleFinalSubmit = () => {
		dispatch(resultsActions.addResults(mongoResult(results)));
		navigate("/recent");
	};

	//** sent to WinnerPodium to handle submission of podium result X and set to results, used for fast lap too *//
	const handleRacePodiumSubmit = (value, resultType, resultNumber) => {
		switch (resultType) {
			case "multiFastLap":
				const driverEntry = eventEntries
					// get matching series entries only
					.filter((entry) => results.series.name === entry.series)
					// loop through those entries, set drivers val to an array of driver objects, then find matching name
					.find((entry) => {
						const drivers = Object.values(entry).filter((val) => typeof val === "object");
						return drivers.some((driver) => driver.name === value.driver);
					});

				setResults((prev) => ({
					...prev,
					[`fastLap${resultNumber}`]: {
						...value,
						class: value.class,
						entry: driverEntry,
					},
				}));
				break;

			case "hardChargerMulti":
				// take in value as vehicle number, get entries matching series then get matching car num
				const hardChargeEntry = eventEntries
					.filter((entry) => results.series.name === entry.series)
					.find((entry) => value.entryNum === entry.number);

				setResults((prev) => ({
					...prev,
					[`hardCharge${resultNumber}`]: {
						startPos: Number(value.startPos),
						gain: Number(value.gain),
						class: value.class,
						entry: hardChargeEntry,
					},
				}));
				break;

			default:
				setResults((prev) => ({
					...prev,
					[`result${resultNumber}`]: value,
				}));
		}
	};

	//grab value and name (for key) from component and set result state
	const getValue = (e) => {
		setResults((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<section className="race-results-container">
			<div className="results-details">
				<DatePicker getValue={getValue} today={getToday()} />
				<EventSearch getValue={getValue} component="podium" />
				<Series getValue={getValue} />
			</div>
			{results.series && (
				<div className="podium_results_container">
					{numOfPodiumDisplays(results.series, handleRacePodiumSubmit)}
					<FastLapContainer onSubmit={handleRacePodiumSubmit} series={results.series} />
					<HardChargeContainer series={results.series} onSubmit={handleRacePodiumSubmit} />
				</div>
			)}
			{results.fastLap1 && (
				<Button
					variant="contained"
					color="success"
					id="podium__submit_all"
					onClick={handleFinalSubmit}
					data-testid="podium__submit_all"
				>
					Submit All
				</Button>
			)}
		</section>
	);
};

export default Podium;
