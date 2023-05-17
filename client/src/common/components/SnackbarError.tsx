import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface SnackbarErrorProps {
  error: boolean;
  errorMessage: string;
  onClose(): void;
}

export default function SnackbarError(props: SnackbarErrorProps) {
  return (
    <Snackbar
      open={props.error}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={props.onClose}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {props.errorMessage}
      </Alert>
    </Snackbar>
  );
}
