"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor({ url, status, statusText, data }) {
        super(`<HttpRequesterError 
            {
                "url": "${url}",
                "status": ${status},
                "statusText": "${statusText}",
                "data": ${JSON.stringify(data)}
            }
        />`);
    }
}
exports.HttpError = HttpError;
