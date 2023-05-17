import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import React from "react";
import { checkAuthCommand } from "../auth/authCommands";
import { useAppDispatch } from "../redux/hooks";
import AppBreadcrumbs from "./AppBreadcrumbs";
import ApplicationBar from "./ApplicationBar";
import { loadAppShellDataCommand } from "./appShellCommands";
import Page from "./Page";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppShell() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadAppShellDataCommand());
  }, [dispatch]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkAuthCommand());
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ApplicationBar />
  
      <Main>
        <DrawerHeader />
        <AppBreadcrumbs />
        <Page />
      </Main>
    </Box>
  );
}
