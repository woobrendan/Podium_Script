import { Grid, Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 50,
  lineHeight: "50px",
  width: 260,
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

const EntryHighlights = ({ series, car, classification }) => {
  const details = [series, car, classification];

  return (
    <Grid container spacing={3} className="elevation-details">
      <Grid item xs={6}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              display: "grid",
              gap: 1,
            }}
          >
            {details.map((detail, index) => (
              <Item key={index} elevation={3}>
                {detail}
              </Item>
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default EntryHighlights;
