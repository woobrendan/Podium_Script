import { TableRow, TableCell, Button } from "@mui/material";
import { useState } from "react";
import { shortenName } from "../../functions/helperFunc";
import EditModal from "./modal/EditModal";

const EntryRows = ({ entry }) => {
	const [showModal, setShowModal] = useState(false);
	const { number, team, vehicle, classification, event, series, driver1, driver2, driver3 } = entry;

	return (
		<>
			<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell component="th" scope="row">
					{shortenName(series)}
				</TableCell>
				<TableCell align="right">{number}</TableCell>
				<TableCell align="right">{team}</TableCell>
				<TableCell align="right">{driver1.name}</TableCell>
				<TableCell align="right">{driver2 ? driver2.name : ""}</TableCell>
				<TableCell align="right">{driver3 ? driver3.name : ""}</TableCell>
				<TableCell align="right">{vehicle}</TableCell>
				<TableCell align="right">{classification}</TableCell>
				<TableCell align="right">{event}</TableCell>
				<TableCell align="right">
					<Button variant="contained" onClick={() => setShowModal(!showModal)}>
						Edit
					</Button>
				</TableCell>
			</TableRow>
			{showModal && <EditModal handleToggle={() => setShowModal(!showModal)} show={showModal} entry={entry} />}
		</>
	);
};

export default EntryRows;
