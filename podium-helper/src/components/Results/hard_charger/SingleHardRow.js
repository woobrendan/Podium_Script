import { TableCell, TableRow } from "@mui/material";

const SingleHardRow = ({ hardCharger }) => {
    const { gain, entry, startPos } = hardCharger;
    const { driver1, driver2, driver3 } = entry;

    const drivers = [driver1, driver2, driver3].filter(Boolean).map((driver) => driver.name);
    const driverStr = drivers.join(" & ");

    const finishPos = startPos - gain;

    return (
        <TableRow>
            <TableCell scope="row" colSpan={1}>
                {hardCharger.class}
            </TableCell>
            <TableCell colSpan={1}>{driverStr}</TableCell>
            <TableCell colSpan={1}>#{entry.number}</TableCell>
            <TableCell align="right" colSpan={1}>
                {startPos}
            </TableCell>
            <TableCell align="right" colSpan={1}>
                {finishPos}
            </TableCell>

            {entry.driver3 && (
                <TableCell align="right" colSpan={1}>
                    {}
                </TableCell>
            )}
            <TableCell align="right" colSpan={1}>
                +{gain}
            </TableCell>
        </TableRow>
    );
};

export default SingleHardRow;
