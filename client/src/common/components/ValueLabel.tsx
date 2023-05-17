import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ValueLabel(props: { link?: string; value: string }) {
  return props.link ? (
    <Typography component={Link} to={`/app/${props.link}`} variant="body2" color="primary" sx={{ pl: 1, fontWeight: "bold" }}>
      {props.value}
    </Typography>
  ) : (
    <Typography variant="body2" sx={{ pl: 1, fontWeight: "bold" }}>
      {props.value}
    </Typography>
  );
}
