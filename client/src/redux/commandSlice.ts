import { createSlice } from '@reduxjs/toolkit';
import { formatErrorMessage } from './pageSlice';

interface RequestState {
    state: "idle" | "loading" | "error" | "success"
    message: string;
}

const initialState = {
    state: "idle",
    message: ""
} as RequestState;

export const commandSlice = createSlice({
    name: "commandSlice",
    initialState,
    reducers: {
        commandStarted: (state) => {
            state.state = "loading";
            state.message = ""
        },
        commandSucceeded: (state) => {
            state.state = "success";
            state.message = ""
        },
        commandFailed: (state, { payload }) => {
            state.state = "error";
            state.message = formatErrorMessage(payload)
        }
    }
});

export const {
    commandStarted,
    commandSucceeded,
    commandFailed
} = commandSlice.actions;
