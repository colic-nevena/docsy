import { createSlice } from "@reduxjs/toolkit";

export function formatErrorMessage(message: string) {
  if (message.length === 0) return message;

  const parts = message.split("[Api] Error -");
  if (parts.indexOf("<HttpError") !== -1) {
    const { statusText, status } = JSON.parse(`{${parts[1].replace("<HttpError", "").replace("/>", "")}}`);
    return `${statusText} (${status})`;
  }

  return message;
}

interface PageState {
  state: "idle" | "loading" | "error" | "success";
  message: string;
}

const initialState = {
  state: "idle",
  message: ""
} as PageState;

export const pageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    pageLoadingStarted: (state) => {
      state.state = "loading";
      state.message = "";
    },
    pageLoadingSucceeded: (state) => {
      state.state = "success";
      state.message = "";
    },
    pageLoadingFailed: (state, { payload }) => {
      state.state = "error";
      state.message = formatErrorMessage(payload);
    }
  }
});

export const { pageLoadingFailed, pageLoadingStarted, pageLoadingSucceeded } = pageSlice.actions;
