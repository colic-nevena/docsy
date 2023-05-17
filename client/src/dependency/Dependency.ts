import AuthService from "../auth/AuthService";
import Repositories from "./Repositories";
import TokenManager from "./TokenManager";
import HttpRequester from "./httpRequester/HttpRequester";

interface Dependency {
    repositories: Repositories
    authService: AuthService
    tokenManager: TokenManager
    create(env: any): void
}

export default class AppDependency implements Dependency {
    public repositories!: Repositories
    public authService!: AuthService
    public tokenManager!: TokenManager

    create(env: any) {
        this.tokenManager = new TokenManager()
        const requester = new HttpRequester(env.REACT_APP_BASE_URL, this.tokenManager)
        this.authService = new AuthService(env.REACT_APP_BASE_URL, requester, this.tokenManager)        
        this.repositories = new Repositories(env, requester, this.tokenManager)
    }
}