import { teal, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    background: {
      default: "#FAFEFE"
    },
    primary: teal,
    secondary: blueGrey
  }
});
