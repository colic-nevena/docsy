import { configureStore } from "@reduxjs/toolkit";
import AppDependency from "../dependency/Dependency";
import { pageSlice } from "./pageSlice";
import { dialogSlice } from "./dialogSlice";
import { commandSlice } from "./commandSlice";
import { signInSlice } from "../signIn/SignInSlice";
import { profileSlice } from "../features/profile/ProfileSlice";

const dependency = new AppDependency();

export function provideEnv(env: any) {
  dependency.create(env);
}

export const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
    command: commandSlice.reducer,
    dialog: dialogSlice.reducer,
    signIn: signInSlice.reducer,
    profile: profileSlice.reducer
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: dependency,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
