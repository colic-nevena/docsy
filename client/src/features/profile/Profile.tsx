import {
  Avatar,
  Box,
  Container,
  Paper,
  PaperProps,
  Typography,
  AvatarProps,
  Grid,
  BoxProps,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../redux/hooks";

const ProfilePaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(2),
}));
const ProfileAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  height: "120px",
  width: "120px",
}));
const InfoBox = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function Profile() {
  const { name, email } = useAppSelector((state) => state.profile);

  return (
    <Container>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5">Your Profile</Typography>
        <Typography variant="subtitle1">Details</Typography>
      </Box>

      <ProfilePaper variant="outlined">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box
              display="flex"
              justifyContent="center"
              component="span"
              sx={{ p: 2 }}
            >
              <ProfileAvatar>AM</ProfileAvatar>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <InfoBox>
              <Typography variant="body2">Name</Typography>
              <Typography variant="body1">{name}</Typography>
            </InfoBox>
            <InfoBox>
              <Typography variant="body2">Email</Typography>
              <Typography variant="body1">{email ? email : "-"}</Typography>
            </InfoBox>
          </Grid>
        </Grid>
      </ProfilePaper>
    </Container>
  );
}
