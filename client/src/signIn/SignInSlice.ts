import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingInState {
    username: string;
    password: string;
    error: string;
    loading: boolean
}

const initialState = {
    username: "",
    password: "",
    loading: false,
    error: "",
} as SingInState

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        inputChanged: (state, { payload }: PayloadAction<{ field: "username" | "password", value: string }>) => {
            state[payload.field] = payload.value
        },
        errorHappened: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        requestStarted: (state) => {
            state.loading = true
        },
        requestFinished: (state) => {
            state.loading = false
        },
        viewUnloaded: () => initialState
    },
})

export const { inputChanged, errorHappened, requestStarted, requestFinished, viewUnloaded } = signInSlice.actions