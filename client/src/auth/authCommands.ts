import { Command } from "./../redux/Command";
import { HttpError } from "../dependency/httpRequester/IHttpRequester";

export const loginCommand = (): Command => async (dispatch, getState, { authService }) => {
    // const { signIn } = getState();
    // try {
    //     dispatch(requestStarted())
    //     await authService.login(signIn.username, signIn.password)
    //     dispatch(requestFinished())
    // }
    // catch (error: any) {
    //     let message = "Login error"
    //     if (HttpError.isHttpError(error))
    //         message = HttpError.parse(error).data.message
    //     dispatch(errorHappened(message))
    // }
}
export const logoutCommand = (): Command => async (dispatch, getState, { tokenManager, authService }) => {
    await authService.logout()
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