import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileView } from "./ProfileRepository";

interface ProfileState {
  id: string;
  name: string;
  email: string;
  error: string;
}

const initialState = {
  id: "",
  name: "",
  email: "",
  error: ""
} as ProfileState;

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileLoaded: (state, { payload }: PayloadAction<ProfileView>) => {
      return Object.entries(payload).reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), initialState);
    },
    errorHappened: (state, { payload }) => {
      state.error = payload;
    }
  }
});

export const { profileLoaded, errorHappened } = profileSlice.actions;