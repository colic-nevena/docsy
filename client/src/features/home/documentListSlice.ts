import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentViewModel } from "./model/DocumentViewModel";

interface DocumentListState {
  documentList: DocumentViewModel[];
}

const initialState = {
  documentList: [],
} as DocumentListState;

export const documentListSlice = createSlice({
  name: "documentListSlice",
  initialState,
  reducers: {
    documentsLoaded: (state, { payload }: PayloadAction<DocumentViewModel[]>) => {
      state.documentList = payload.slice();
      state.documentList.sort((d1, d2) => new Date(d2.createdAt).getTime() - new Date(d1.createdAt).getTime());
    },
    viewUnloaded: () => initialState,
  },
});

export const { viewUnloaded, documentsLoaded } = documentListSlice.actions;
