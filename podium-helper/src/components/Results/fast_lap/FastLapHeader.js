import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { grCup } from "../../../functions/helperFunc";
import SingleFastLap from "./SingleFastLap";

const FastLapHeader = ({ allFastLaps }) => {
    const { fastLap1, fastLap2, fastLap3 } = allFastLaps;
    const { entry } = fastLap1;
    const { series } = entry;
    const fastLapVals = [fastLap1, fastLap2, fastLap3].filter(Boolean);

    const mappedFastLapRows = fastLapVals.map((result, index) => <SingleFastLap fastLap={result} key={index} />);

    return (
        <>
            <TableHead className="table_header">
                <TableRow>
                    <TableCell colSpan={entry.driver3 ? 4 : 3}>Driver</TableCell>
                    <TableCell colSpan={2} align="center">
                        {series === grCup ? "Fast Lap" : "CrowdStrike Fast Lap"}
                    </TableCell>
                    <TableCell align="right" colSpan={2}>
                        Lap Time
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{mappedFastLapRows}</TableBody>
        </>
    );
};

export default FastLapHeader;
