export class UndefinedTokenError extends Error {}

export default class TokenManager {
  public static readonly KEY = "APP_TOKEN";

  hasToken(): boolean {
    return window.localStorage.getItem(TokenManager.KEY) !== null;
  }

  token(): any {
    const token = window.localStorage.getItem(TokenManager.KEY);
    if (token === null) throw new UndefinedTokenError();
    return JSON.parse(token);
  }

  storeToken(newToken: any): void {
    window.localStorage.setItem(TokenManager.KEY, JSON.stringify(newToken));
    this.emitChange();
  }

  deleteToken(): void {
    window.localStorage.removeItem(TokenManager.KEY);
    this.emitChange();
  }

  private emitChange() {
    window.dispatchEvent(new Event("token-status-changed"));
  }
}
