import { Card } from "@mui/material";
import { grCup } from "../../../functions/helperFunc";
import { useSelector } from "react-redux";
import SingleFastLapCard from "./SingleFastLapCard";
import { getAwardEntries, getClassArr } from "../../../functions/podiumResultHelpers";

const FastLapContainer = ({ series, onSubmit }) => {
	const eventEntries = useSelector((state) => state.entry.eventEntries);

	const fastLapCards = getClassArr(series).map((classif, index) => {
		const entries = getAwardEntries(eventEntries, series, classif);

		return (
			<SingleFastLapCard
				key={index}
				classif={classif}
				resultNum={index + 1}
				onSubmit={onSubmit}
				entries={entries}
			/>
		);
	});
	return (
		<div className="results-container">
			<Card className="podium_card">
				<h2>Fast Lap</h2>
				<div className="award_container">{fastLapCards}</div>
			</Card>
		</div>
	);
};

export default FastLapContainer;
