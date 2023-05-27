import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
const https = require("https");
const fs = require("fs");
import path from "path";

export type ErrorResponse = {
  message: string;
  errorCode: string;
  status: number;
};

export default abstract class HttpServer {
  private readonly skippedRoutes = ["", "/ping"];
  protected tag = "HTTP API";
  private readonly clientDirectory = "client";

  private readonly options = {
    cert: fs.readFileSync(path.join(__dirname, "ssl/certs", "cert.pem")),
    key: fs.readFileSync(path.join(__dirname, "ssl/certs", "cert-key.pem")),
  };

  start(port: number) {
    const app = express();
    app.use(cors());
    app.use("/", express.static(path.join(__dirname, "../../../../", this.clientDirectory)));
    this.addLogger(app);
    this.applyMiddleware(app);
    this.createRoutes(app);
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      const { errorCode, message, status } = this.handleError(err);
      res.status(status).json({ message, errorCode });
    });
    const server = https.createServer(this.options, app);
    server.listen(port, () => console.log(`[${this.tag}] Port: ${port}. Listening...`));
    // app.listen(port, () => console.log(`[${this.tag}] Port: ${port}. Listening...`));
  }

  private addLogger(app: Application) {
    app.use(
      morgan(
        (tokens, req, res) => {
          return [
            `[${req.headers["user-agent"] ? req.headers["user-agent"] : "unknown"}]`,
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
          ].join(" ");
        },
        {
          skip: (req, res) => {
            if (this.skippedRoutes.find((route) => route === req.url)) return true;
            return false;
          },
        }
      )
    );
  }

  protected handleError(error: Error): ErrorResponse {
    console.log(error);
    return {
      message: "Internal server error",
      errorCode: "SERVER_ERROR",
      status: 500,
    };
  }
  protected abstract applyMiddleware(app: Application): void;
  protected abstract createRoutes(app: Application): void;
  protected errorMessageContains(error: Error, messages: string[]) {
    const message = error.message;
    return messages.map((m) => message.indexOf(m) !== -1).reduce((p, c) => p && c, true);
  }
  protected errorResponse(message: string, errorCode: string, status: number): ErrorResponse {
    return { message, errorCode, status };
  }
}
