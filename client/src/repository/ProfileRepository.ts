import jwt_decode from "jwt-decode";
import IProfileRepository, { ProfileView } from "./IProfileRepository";
import TokenManager from "../dependency/TokenManager";

export default class ProfileRepository implements IProfileRepository {
  constructor(private readonly _tokenManager: TokenManager) {}

  getProfile(): ProfileView {
    const { sub, name, email } = jwt_decode(this._tokenManager.token().access_token) as any;
    return { id: sub, name, email };
  }
}
