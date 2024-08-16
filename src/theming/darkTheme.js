import { createTheme } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        primary: {
            light: grey[500],
            main: grey[700],
            dark: grey[900],
        },
        secondary: {
            light: green[200],
            main: "#798897",
            dark: green[800],
        }
    },
});

export default darkTheme;