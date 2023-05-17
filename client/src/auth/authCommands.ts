import { Command } from "./../redux/Command";
import { errorHappened, requestFinished, requestStarted } from "../signIn/SignInSlice";
import ErrorHandler from "../ErrorHandler";

export const loginCommand = (): Command => async (dispatch, getState, { authService }) => {
    const { signIn } = getState();
    try {
        dispatch(requestStarted())
        await authService.login(signIn.username, signIn.password)
        dispatch(requestFinished())
    }
    catch (error: any) {
        console.log(error)
        let message = "Login error"
        const errorMessage = ErrorHandler.errored(error, message);
        dispatch(errorHappened(errorMessage));
    }
}

export const logoutCommand = (): Command => async (dispatch, getState, { tokenManager, authService }) => {
    tokenManager.deleteToken();
}

export const checkAuthCommand = (): Command => async (dispatch, getState, { tokenManager, authService }) => {
    try {
        await authService.check()
    }
    catch (error: any) {
        tokenManager.deleteToken();
    }
}