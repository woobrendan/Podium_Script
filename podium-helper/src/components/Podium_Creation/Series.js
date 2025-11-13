import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const Series = ({ getValue, comp }) => {
    const [seriesName, setSeriesName] = useState("");

    const seriesList = useSelector((state) => state.series.seriesArr);

    const series = comp === "entryManager" ? ["All", ...seriesList] : seriesList;

    const handleChange = (event) => {
        setSeriesName(event.target.value);
        getValue(event);
    };

    return (
        <FormControl className="series_dropdown">
            <InputLabel>Series</InputLabel>
            <Select name="series" label="Series" value={seriesName} onChange={(e) => handleChange(e)}>
                {series.map((serie, index) => (
                    <MenuItem key={index} value={serie} data-testid={serie.name}>
                        {serie === "All" ? "All" : serie.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Series;
