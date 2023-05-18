import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useLocation } from "react-router";
import { AppBarLogout } from "./AppBarLogout";
import logo from "../assets/logo.png"


export default function ApplicationBar() {
  const location = useLocation();

  const title = React.useMemo(() => {
    const parts = location.pathname
      .split("/app")
      .filter((item) => item.length > 0);
    if (parts.length === 0) return "Default title";
    const result = parts[0].split("/")[1].replace("-", " ");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }, [location]);

  return (
    <MuiAppBar
      position="fixed"
      sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
    >
      <Toolbar>
        <img src={logo} alt="logo" width={40} height={40} />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, pl: 1 }}>
          {title}
        </Typography>
        <AppBarLogout />
      </Toolbar>
    </MuiAppBar>
  );
}
