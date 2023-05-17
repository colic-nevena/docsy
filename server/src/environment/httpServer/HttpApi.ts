import express from 'express';
import session from 'express-session';
import HttpServer, { ErrorResponse } from './HttpServer';
import Api from 'src/api/Api';

export default class HttpApi extends HttpServer {

    constructor(private readonly api: Api) {
        super()
    }

    protected applyMiddleware(app: express.Application): void {
        app
            .set('trust proxy', true)
            .use(session({
                secret: 'some secret',
                resave: false,
                saveUninitialized: true,
                store: new session.MemoryStore()
            }))
            .use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
            .use(express.json())
    }

    protected createRoutes(app: express.Application): void {
        const routers = this.api.routers()
        for (const { path, router } of routers)
            app.use(path, router)

    }
    
    protected handleError(error: Error): ErrorResponse {
        return this.api.handleError(error)
    }
}
