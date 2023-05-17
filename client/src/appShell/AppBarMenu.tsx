import { Logout } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { logoutCommand } from "../auth/authCommands";
import { useAppDispatch } from "../redux/hooks";

export function AppBarMenu() {

  const dispatch = useAppDispatch();

  const logoutAction = React.useCallback(() => {
    dispatch(logoutCommand());
  }, [dispatch]);

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={logoutAction}
        color="inherit"
      >
        <Logout fontSize="small" />
      </IconButton>      
    </div>
  );
}