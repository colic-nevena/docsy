import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CircularProgress, Grid, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { loginCommand } from "../auth/authCommands";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { inputChanged, viewUnloaded } from "./SignInSlice";


export default function SignIn() {
  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.signIn);

  React.useEffect(() => {
    return () => {
      dispatch(viewUnloaded());
    };
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(loginCommand());
    },
    [dispatch]
  );

  const changeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch(
        inputChanged({
          field: event.target.name === "email" ? "username" : "password",
          value: event.target.value
        })
      );
    },
    [dispatch]
  );

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: "url(/wallpaper.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {loading ? (
            <CircularProgress size="40px" sx={{ m: 1 }} />
          ) : (
            <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error ? (
            <Typography component="span" color="red" variant="subtitle1">
              {error}
            </Typography>
          ) : null}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={changeInput}
            />
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeInput}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
