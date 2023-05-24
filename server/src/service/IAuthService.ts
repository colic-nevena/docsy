export default interface IAuthService {
  startSession(username: string, password: string): Promise<any>;
  refreshSession(refreshToken: string): Promise<any>;
}
