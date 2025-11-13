import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const DatePicker = ({ getValue, today }) => {
    const [date, setDate] = useState(today);

    const handleChange = (e, newValue) => {
        const newDate = newValue.toISOString().split("T")[0];
        setDate(newDate);
        getValue(e);
    };

    return (
        <div id="date-picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Date"
                        inputFormat="yyyy-MM-dd"
                        name="date"
                        value={date}
                        onChange={(e) => handleChange(e)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    );
};

export default DatePicker;
