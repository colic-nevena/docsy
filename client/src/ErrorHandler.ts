export default class ErrorHandler {
  public static errored(e: any, message: string) {
    let errorMessage = message;

    if (e.cause && e.cause.message) {
      if (e.cause.message.indexOf("SERVER_ERROR") === -1) {
        errorMessage = e.cause.message;
      }
    }

    return errorMessage;
  }
}
