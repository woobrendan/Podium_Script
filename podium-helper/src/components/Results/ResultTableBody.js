import { TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import "../../Styling/result.scss";
import { getPlaceString } from "../../functions/helperFunc";

const ResultTableBody = ({ results }) => {
    const { firstPlace, secondPlace, thirdPlace } = results;

    const checkPodium = () => {
        //** Loop through each placemnt, if that place exists create the data and push that arr */
        const placements = [firstPlace, secondPlace, thirdPlace].filter(Boolean);

        return placements.map((placement, index) => {
            const { number, driver1, driver2, driver3, team, vehicle } = placement;

            return {
                place: getPlaceString(index),
                number,
                driver1,
                team,
                car: vehicle,
                driver2: driver2 || null,
                driver3: driver3 || null,
            };
        });
    };

    const placementRows = checkPodium().map((row, index) => {
        const { place, number, driver1, driver2, driver3, team, car } = row;
        return (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {place}
                </TableCell>
                <TableCell>#{number}</TableCell>
                <TableCell colSpan={driver2 ? 1 : 2}>{driver1}</TableCell>
                {driver2 && <TableCell>{driver2}</TableCell>}
                {driver3 && <TableCell align="right">{driver3}</TableCell>}
                <TableCell>{team}</TableCell>
                <TableCell align="right">{car}</TableCell>
            </TableRow>
        );
    });

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={7} align="center" className="table_header">
                        {results.class}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{placementRows}</TableBody>
        </>
    );
};

export default ResultTableBody;
