import { FormControl, InputLabel, Select, Box } from "@mui/material";

const PlacementInput = ({
  name,
  value,
  handleWinners,
  mappedDrivers,
  label,
  boxNum,
}) => {
  return (
    <Box data-testid={`${name}_podium_${boxNum}`} className="placement_input">
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          label={label}
          value={value}
          onChange={handleWinners}
        >
          {mappedDrivers}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PlacementInput;
