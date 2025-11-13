import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import EditVehicle from "./EditVehicle.js";
import EditDriver from "./EditDriver.js";
import Series from "../../Podium_Creation/Series.js";
import {
	gtwca,
	gt4a,
	igtc,
	tcam,
	gtam,
	convertEntryFormat,
	grCup,
} from "../../../functions/helperFunc.js";
import { useDispatch } from "react-redux";
import { entryActions } from "../../../store/entries/entry_slice.js";
import InputContainer from "./InputContainer.js";
import axios from "axios";
import { driverInfo } from "../functions/entryFuncs.js";
import {
	initialEntryState,
	errorState,
	checkEntryErrors,
} from "../../../functions/entryManager.js";
import useEvents from "../../../functions/useEvents.js";
import EventSelect from "./EventSelect.js";

const AddEntry = ({ show, handleToggle }) => {
	const [newEntry, setNewEntry] = useState(initialEntryState);
	const [error, setError] = useState(errorState);
	const { currentEventName } = useEvents();

	const dispatch = useDispatch();
	const customSetError = (err) => setError(err);
	const series = newEntry.series;

	const driverPair = {
		[gtwca]: "2",
		[gt4a]: "2",
		[igtc]: "3",
		[tcam]: "1",
		[gtam]: "1",
		[grCup]: "1",
	};

	const onInputChange = (e) => {
		setNewEntry((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const renderEditDrivers = () => {
		const driverNum = driverPair[newEntry.series];

		const driverCount = parseInt(driverNum);

		return (
			<section className={`input_driver_container drivers_${driverNum}`}>
				{[...Array(driverCount)].map((_, index) => (
					<EditDriver
						key={`driver-${index + 1}`}
						entry={newEntry}
						onChange={onDriverChange}
						driverNum={`${index + 1}`}
					/>
				))}
			</section>
		);
	};

	const getSeries = (e) => {
		const { name, value } = e.target;
		const seriesName = value.name;

		setNewEntry((prev) => ({
			...prev,
			[name]: seriesName,
			...(driverPair[seriesName] !== "1" ? { driver2: driverInfo } : {}),

			...(driverPair[seriesName] === "3" ? { driver3: driverInfo } : {}),
		}));
	};

	const handleSubmit = async () => {
		const noErrors = checkEntryErrors(newEntry, error, customSetError);
		if (noErrors) {
			try {
				newEntry.event = currentEventName;
				const entry = await axios.post(
					"http://localhost:2020/api/entries",
					newEntry
				);
				const converted = convertEntryFormat(entry.data.savedEntry);

				//add entry to event entries and/or all

				dispatch(entryActions.addEntry(converted));
				setNewEntry(initialEntryState);
				handleToggle();
			} catch (err) {
				console.log("Error Adding Entry:", err);
			}
		}
	};

	const onDriverChange = (e) => {
		// driver 1 name/nationality/rating
		const nameVal = e.target.name.split(" ");
		const driver = nameVal.slice(0, 2).join("");

		const keyVal = nameVal[2];

		setNewEntry((prev) => ({
			...prev,
			[driver]: {
				...prev[driver],
				[keyVal]: e.target.value,
			},
		}));
	};

	return (
		<Modal open={show} onClose={handleToggle}>
			<Box id="addEntry_modal">
				<Series getValue={getSeries} />
				{newEntry.series && (
					<>
						<InputContainer
							val={newEntry.team}
							name="team"
							onInputChange={onInputChange}
							label="Team"
						/>
						<EventSelect />
						<EditVehicle
							entry={newEntry}
							onInputChange={onInputChange}
							series={series}
							classification={newEntry.classification}
						/>
						{renderEditDrivers()}
					</>
				)}
				<Button
					variant="outlined"
					color="error"
					className="edit_modal_update"
					onClick={() => handleSubmit()}
				>
					Add
				</Button>
			</Box>
		</Modal>
	);
};

export default AddEntry;
