export type ViewState = {
    type: "loading" | "error" | "success";
    message: string;
}

export default class ViewStateFactory {
    static loading(): ViewState {
        return { type: "loading", message: "" }
    }
    static success(): ViewState {
        return { type: "success", message: "" }
    }
    static error(message: string): ViewState {
        return { type: "error", message }
    }
}