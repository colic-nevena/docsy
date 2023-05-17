import ProfileRepository from "../repository/ProfileRepository";
import TokenProfileRepository from "../repository/TokenProfileRepository";
import Api from "./Api";
import IHttpRequester from "./httpRequester/IHttpRequester";
import TokenManager from "./TokenManager";

export default class Repositories {
    public readonly profileRepository: ProfileRepository;

    constructor(env: any, requester: IHttpRequester, tokenManager: TokenManager) {
        const api = new Api(env.REACT_APP_BASE_URL, requester);
   
        this.profileRepository = new TokenProfileRepository(tokenManager);
      }
}