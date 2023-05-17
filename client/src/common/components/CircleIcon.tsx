import CircleIcon from "@mui/icons-material/Circle";
import React from "react";

interface Props {
  status: string;
}

let statusCircle: React.ReactElement;

export default function StatusCircle({ status }: Props) {
  switch (status) {
    case "ONLINE":
      statusCircle = <CircleIcon color="primary" style={{ fontSize: 8 }} />;
      break;
    case "OFFLINE":
      statusCircle = <CircleIcon color="error" style={{ fontSize: 8 }} />;
      break;
    case "UNKNOWN":
      statusCircle = <CircleIcon color="secondary" style={{ fontSize: 8 }} />;
      break;
  }

  return statusCircle;
}
