import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const DriverTable = ({ drivers }) => {
    const tableRows = () => {
        const driversArr = [
            drivers.driver1,
            drivers.driver2,
            drivers.driver3,
        ].filter(Boolean);

        return driversArr.map((driver) => ({
            name: driver.name,
            nationality: driver.nationality,
            rating: driver.rating,
        }));
    };

    return (
        <TableContainer component={Paper} className="driver-table">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Driver</TableCell>
                        <TableCell align="right">Nat.</TableCell>
                        <TableCell align="right">Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows().map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell scope="row">{row.name}</TableCell>
                            <TableCell align="right">
                                {row.nationality}
                            </TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DriverTable;
