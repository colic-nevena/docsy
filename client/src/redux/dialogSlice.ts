import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
    show: boolean
    type: string
    data: any
}

const initialState = {
    show: false,
    type: "",
    data: {}
} as DialogState;

export const dialogSlice = createSlice({
    name: "dialogSlice",
    initialState,
    reducers: {
        showDialog: (state, { payload }: PayloadAction<{ type: string, data: any }>) => {
            state.show = true
            state.type = payload.type
            state.data = payload.data
        },
        hideDialog: (state) => {
            state.show = false
            state.type = ""
            state.data = {}
        }
    }
});

export const {
    showDialog,
    hideDialog
} = dialogSlice.actions;
