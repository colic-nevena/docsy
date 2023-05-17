"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadApiParameters = void 0;
class BadApiParameters extends Error {
    constructor() {
        super("Bad api parameters");
    }
}
exports.BadApiParameters = BadApiParameters;
class Api {
    constructor(apiRouters) {
        this.apiRouters = apiRouters;
    }
    routers() {
        return this.apiRouters;
    }
    handleError(error) {
        console.log(error);
        return this.errorResponse("Internal server error", "SERVER_ERROR", 500);
    }
    errorResponse(message, errorCode, status) {
        return { message, errorCode, status };
    }
}
exports.default = Api;
