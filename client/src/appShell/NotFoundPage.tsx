import { Typography, Grid } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column">
      <img src="/not_found.png" alt="NotFoundPage" width="25%" height="25%" />
      <Typography variant="h5">There's nothing here!</Typography>
    </Grid>
  );
}
