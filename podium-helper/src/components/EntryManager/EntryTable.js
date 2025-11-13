import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody } from "@mui/material";
import EntryRows from "./EntryRows";

const EntryTable = ({ entries }) => {
    return (
        <section id="entryManager_table">
            <TableContainer sx={{ minWidth: 600 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Series</TableCell>
                            <TableCell align="right">#</TableCell>
                            <TableCell align="right">Team</TableCell>
                            <TableCell align="right">Driver 1</TableCell>
                            <TableCell align="right">Driver 2</TableCell>
                            <TableCell align="right">Driver 3</TableCell>
                            <TableCell align="right">Vehicle</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Event</TableCell>
                            <TableCell align="right">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry, index) => (
                            <EntryRows entry={entry} key={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default EntryTable;
