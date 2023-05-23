import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  show: boolean;
  type: string;
  data: any;
  snackOpen?: boolean;
  snackText?: string;
}

const initialState = {
  show: false,
  type: "",
  data: {},
  snackOpen: false,
  snackText: "",
} as DialogState;

export const dialogSlice = createSlice({
  name: "dialogSlice",
  initialState,
  reducers: {
    showDialog: (state, { payload }: PayloadAction<{ type: string; data: any }>) => {
      state.show = true;
      state.type = payload.type;
      state.data = payload.data;
    },
    hideDialog: (state) => {
      state.show = false;
      state.type = "";
      state.data = {};
    },
    snackOpened: (state, { payload }: PayloadAction<string>) => {
      state.snackOpen = true;
      state.snackText = payload;
    },
    snackClosed: (state) => {
      state.snackOpen = false;
    },
  },
});

export const { showDialog, hideDialog, snackOpened, snackClosed } = dialogSlice.actions;
