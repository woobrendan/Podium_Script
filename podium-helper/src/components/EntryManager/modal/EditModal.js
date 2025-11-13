import { Modal, Box, Button } from "@mui/material";
import { useState } from "react";
import "../../../Styling/modal.scss";
import EditDriver from "./EditDriver";
import EditVehicle from "./EditVehicle";
import { useDispatch } from "react-redux";
import { entryActions } from "../../../store/entries/entry_slice";
import { gtwca, gt4a, igtc, gtam, tcam, mta } from "../../../functions/helperFunc";

const EditModal = ({ entry, handleToggle, show }) => {
	const [modalEntry, setModalEntry] = useState({
		...entry,
		driver1: { ...entry.driver1 },
		...(entry.driver2 ? { driver2: { ...entry.driver2 } } : {}),
		...(entry.driver3 ? { driver3: { ...entry.driver3 } } : {}),
	});
	const [toBeDeleted, setToBeDeleted] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = () => {
		// no errors
		handleToggle();
		dispatch(entryActions.updateEntry(modalEntry));
	};

	const onInputChange = (e) => {
		setModalEntry((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onDriverChange = (e) => {
		// driver 1 name/nationality/rating
		const nameVal = e.target.name.split(" ");
		const driver = nameVal.slice(0, 2).join("");

		const keyVal = nameVal[2];

		setModalEntry((prev) => ({
			...prev,
			[driver]: {
				...prev[driver],
				[keyVal]: e.target.value,
			},
		}));
	};

	const handleDelete = (entry) => {
		dispatch(entryActions.removeEntry(entry));
		handleToggle();
	};

	const renderEditDrivers = () => {
		// use driverPair and numOfDrivers to get classNames for styling, but also array to render correct num of EditDriver components
		const driverPair = {
			[gtwca]: 2,
			[gt4a]: 2,
			[igtc]: 3,
			[tcam]: 1,
			[gtam]: 1,
			[mta]: 2,
		};
		const driverCount = driverPair[modalEntry.series];

		return (
			<section className={`input_driver_container drivers_${driverCount}`}>
				{[...Array(driverCount)].map((_, index) => (
					<EditDriver
						key={`driver-${index + 1}`}
						entry={modalEntry}
						onChange={onDriverChange}
						driverNum={`${index + 1}`}
					/>
				))}
			</section>
		);
	};

	return (
		<Modal open={show} onClose={handleToggle}>
			<Box id="edit_modal">
				<Button
					variant="outlined"
					color="error"
					className="edit_modal_delete"
					data-testid="modal_delete"
					onClick={() => setToBeDeleted(!toBeDeleted)}
				>
					{toBeDeleted ? "Cancel" : "Delete Entry"}
				</Button>
				<div id="entry_info">
					<h1>{modalEntry.team}</h1>
					<h2>Series: {modalEntry.series}</h2>
					<h2>Event: {modalEntry.event}</h2>
				</div>
				<EditVehicle
					entry={modalEntry}
					onInputChange={onInputChange}
					classification={modalEntry.classification}
					series={modalEntry.series}
				/>
				{renderEditDrivers()}
				<Button variant="outlined" color="error" className="edit_modal_update" onClick={(e) => handleSubmit(e)}>
					Update
				</Button>
				{toBeDeleted && (
					<Button
						variant="contained"
						color="error"
						data-testid="modal_delete_confirm"
						onClick={() => handleDelete(modalEntry)}
					>
						Confirm Delete
					</Button>
				)}
			</Box>
		</Modal>
	);
};

export default EditModal;
