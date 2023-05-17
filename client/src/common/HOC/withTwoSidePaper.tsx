import { Grid, Paper } from "@mui/material";

export default function withTwoSidePaper<T>(
  LeftView: React.ComponentType,
  RightView: React.ComponentType
) {
  return (props: any) => {
    return (
      <Paper variant="outlined" sx={{ pt: 0.75, pl: 3, pr: 1 }}>
        <Grid container>
          <Grid item xs={8}>
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <LeftView />
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={4}
            justifyContent="flex-end"
            alignItems="center"
          >
            <RightView />
          </Grid>
        </Grid>
      </Paper>
    );
  };
}
