import { TableCell, TableRow } from "@mui/material";

const SingleFastLap = ({ fastLap }) => {
    const { laptime, entry } = fastLap;
    const { driver1, driver2, driver3 } = entry;

    const drivers = [driver1, driver2, driver3].filter(Boolean).map((driver) => driver.name);
    const driverStr = drivers.join(" & ");

    return (
        <TableRow>
            <TableCell colSpan={2}>{driverStr}</TableCell>
            <TableCell>#{entry.number}</TableCell>
            <TableCell align="right">{entry.team}</TableCell>
            <TableCell align="right" colSpan={entry.driver3 ? 2 : 1}>
                {entry.vehicle}
            </TableCell>
            <TableCell align="right" colSpan={entry.driver3 ? 3 : 1}>
                {laptime}
            </TableCell>
        </TableRow>
    );
};

export default SingleFastLap;
