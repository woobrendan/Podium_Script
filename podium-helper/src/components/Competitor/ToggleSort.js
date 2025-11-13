import { FormControl, InputLabel, Select, Box, MenuItem } from "@mui/material";
import { useState } from "react";

const ToggleSort = ({ getOption }) => {
    const [sortOption, setSortOption] = useState("");

    const handleToggle = (event) => {
        setSortOption(event.target.value);
        getOption(event.target.value);
    };

    return (
        <Box className="sort-option-selector">
            <FormControl color="error">
                <InputLabel>Sort By</InputLabel>
                <Select name="sort-by" label="Sort By" value={sortOption} onChange={handleToggle}>
                    {["Number", "Manufacturer", "Vehicle Type", "Class"].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default ToggleSort;
