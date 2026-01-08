import React from "react";
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ResultTableBody from "./ResultTableBody";
//import FastLapTable from "./FastLapTable";
import "../../Styling/result.scss";
import { dateToString } from "../../functions/dateFuncs";
import MultiHardHeader from "./hard_charger/MultiHardHeader";
import FastLapHeader from "./fast_lap/FastLapHeader";

const ResultTableHeader = ({ results }) => {
	const { event, series, date, fastLap1, fastLap2, fastLap3, result1, hardCharge1, hardCharge2, hardCharge3 } =
		results;

	const { driver2, driver3 } = result1.firstPlace;
	const allHardCharger = { hardCharge1, hardCharge2, hardCharge3 };
	const allFastLaps = { fastLap1, fastLap2, fastLap3 };

	const allResults = [result1, results.result2, results.result3, results.result4]
		.filter(Boolean)
		.map((result, index) => <ResultTableBody results={result} key={index} />);

	return (
		<TableContainer component={Paper} id="result-table-container">
			<Table>
				<TableHead className="result-table-head">
					<TableRow>
						<TableCell colSpan={driver3 ? 4 : 3} align="center">
							{event}
						</TableCell>
						<TableCell colSpan={2} align="right">
							{series}
						</TableCell>
						<TableCell colSpan={2} align="right">
							{dateToString(date)}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableHead>
					<TableRow>
						<TableCell>Place</TableCell>
						<TableCell>#</TableCell>
						<TableCell colSpan={driver2 ? 1 : 2}>Driver 1</TableCell>
						{driver2 && <TableCell>Driver 2</TableCell>}
						{driver3 && <TableCell align="right">Driver 3</TableCell>}
						<TableCell>Team</TableCell>
						<TableCell align="right">Vehicle</TableCell>
					</TableRow>
				</TableHead>
				{allResults}
				{fastLap1 && <FastLapHeader allFastLaps={allFastLaps} />}
				{hardCharge1 && <MultiHardHeader allHardCharger={allHardCharger} />}
			</Table>
		</TableContainer>
	);
};

export default ResultTableHeader;
