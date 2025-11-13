import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { grCup } from "../../../functions/helperFunc";
import SingleHardRow from "./SingleHardRow";

const MultiHardHeader = ({ allHardCharger }) => {
    const { hardCharge1, hardCharge2, hardCharge3 } = allHardCharger;
    const { entry } = hardCharge1;
    const { series } = entry;
    const hardChargeVals = [hardCharge1, hardCharge2, hardCharge3].filter(Boolean);

    const mappedHardRows = hardChargeVals.map((result, index) => <SingleHardRow hardCharger={result} key={index} />);

    return (
        <>
            <TableHead className="table_header">
                <TableRow>
                    <TableCell colSpan={entry.driver3 ? 7 : 6} align="center">
                        {series === grCup ? "Hard Charger" : "E-Boost Hard Charger"}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={1}>Class</TableCell>
                    <TableCell colSpan={1}>Driver</TableCell>
                    <TableCell colSpan={1}>Car #</TableCell>
                    <TableCell align="right" colSpan={1}>
                        Start Position
                    </TableCell>
                    <TableCell align="right" colSpan={1}>
                        Finish Position
                    </TableCell>

                    <TableCell align="right" colSpan={entry.driver3 ? 2 : 1}>
                        Positions Gained
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{mappedHardRows}</TableBody>
        </>
    );
};

export default MultiHardHeader;
