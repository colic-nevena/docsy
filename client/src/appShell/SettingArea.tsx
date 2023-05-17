import { Settings } from "@mui/icons-material";
import { Box, Grid, Divider, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const placing = { position: "absolute", bottom: 0, p: 1, width: "100%" };

export function SettingArea() {
  return (
    <Box sx={placing}>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 1 }}
      >
        <Grid item>
          <Button
            variant="text"
            component={Link}
            to="/app/settings"
            startIcon={<Settings />}
          >
            Settings
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
