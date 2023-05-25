import DocumentRepository from "../repository/DocumentRepository";
import IDocumentRepository from "../repository/IDocumentRepository";
import IProfileRepository from "../repository/IProfileRepository";
import ProfileRepository from "../repository/ProfileRepository";
import Api from "./Api";
import IHttpRequester from "./httpRequester/IHttpRequester";
import TokenManager from "./TokenManager";

export default class Repositories {
  public readonly profileRepository: IProfileRepository;
  public readonly documentRepository: IDocumentRepository;

  constructor(env: any, requester: IHttpRequester, tokenManager: TokenManager) {
    const api = new Api(env.REACT_APP_BASE_URL, requester);

    this.profileRepository = new ProfileRepository(tokenManager);
    this.documentRepository = new DocumentRepository(api, tokenManager, env.REACT_APP_BASE_URL);
  }
}
