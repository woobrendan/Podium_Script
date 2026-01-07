import { useState } from "react";
import { Button } from "@mui/material";

const SingleFastLapCard = ({ classif, resultNum, onSubmit, entries }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [fastLap, setFastLap] = useState({
		driver: "",
		laptime: "",
		class: classif,
	});

	const handleChange = (e) => {
		setFastLap((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = () => {
		onSubmit(fastLap, "multiFastLap", resultNum);
		setIsSubmitted(true);
	};

	const driverOptions = entries
		.flatMap((entry) => {
			const { number, vehicle, driver1, driver2, driver3 } = entry;
			return [
				{ number, driver: driver1.name, vehicle },
				...(driver2 ? [{ number, driver: driver2.name, vehicle }] : []),
				...(driver3 ? [{ number, driver: driver3.name, vehicle }] : []),
			];
		})
		.sort((a, b) => a.number - b.number)
		.map((entry, index) => {
			return (
				<option value={entry.driver} key={index}>
					#{entry.number} - {entry.driver}
				</option>
			);
		});

	return (
		<section className="single_fast_lap_container single_award">
			<h3>{classif}</h3>
			<section className="single_award_section">
				<div className="fast_driver award_input">
					<label>Driver:</label>
					<select name="driver" value={fastLap.driver} onChange={handleChange}>
						<option value="" disabled>
							Select Driver
						</option>
						{driverOptions}
					</select>
				</div>
				<div className="lap_time award_input">
					<label>Lap Time:</label>
					<input type="text" value={fastLap.laptime} name="laptime" onChange={handleChange} />
				</div>
			</section>
			<Button size="small" variant="contained" color={isSubmitted ? "success" : "error"} onClick={handleSubmit}>
				{isSubmitted ? "Update" : "Submit"}
			</Button>
		</section>
	);
};

export default SingleFastLapCard;
