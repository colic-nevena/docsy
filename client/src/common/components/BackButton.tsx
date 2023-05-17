import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button/Button";

interface Props {
  to: string;
}

export default function BackButton({ to }: Props) {
  return (
    <Button component={Link} to={to}>
      Back
    </Button>
  );
}
