import { Alert, AlertTitle, Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import FullScreenLoader from "../common/components/FullScreenLoader";
import SnackbarError from "../common/components/SnackbarError";
import { commandSucceeded } from "../redux/commandSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function PageError({ message }: { message: string }) {
  return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error">
        <AlertTitle>Page loading failed</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}

function CommandError() {
  const { state, message } = useAppSelector((state) => state.command);
  const dispatch = useAppDispatch();

  const errorFlag = state === "error";

  return (
    <SnackbarError error={errorFlag} errorMessage={message} onClose={() => dispatch(commandSucceeded())} />
  );
}

export default function Page() {
  const state = useAppSelector((state) => state.page);

  const loading = state.state === "loading";
  const error = state.state === "error";
  const errorMessage = state.state === "error" ? state.message : "";

  // if (error) return <h1>{errorMessage}</h1>;
  return (
    <>
      {error ? <PageError message={errorMessage} /> : null}
      <Outlet />
      <FullScreenLoader loading={loading} />
      <CommandError />
    </>
  );
}
