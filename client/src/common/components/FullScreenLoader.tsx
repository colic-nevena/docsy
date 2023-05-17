import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function FullScreenLoader(props: { loading: boolean }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
