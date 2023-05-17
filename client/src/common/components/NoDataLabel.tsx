import { Typography } from "@mui/material";

export default function NoDataLabel() {
  return (
    <Typography variant="body2" sx={{ pl: 1, fontWeight: "bold" }}>
      {"<no info>"}
    </Typography>
  );
}
