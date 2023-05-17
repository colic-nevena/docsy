"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigError = void 0;
class ConfigError extends Error {
    constructor(message) {
        super(`[Config] Error - ${message}`);
    }
}
exports.ConfigError = ConfigError;
class BaseConfig {
    convertToNumber(tag, value) {
        const result = parseInt(value);
        if (isNaN(result))
            throw new ConfigError(`[convertToNumber] - ${tag} is not a number, ${tag} - ${value}`);
        return result;
    }
    convertToFloat(tag, value) {
        const result = parseFloat(value);
        if (isNaN(result))
            throw new ConfigError(`[convertToNumber] - ${tag} is not a number, ${tag} - ${value}`);
        return result;
    }
    convertToBoolean(tag, value) {
        if (value === undefined || value === null)
            throw new ConfigError(`[convertToBoolean] - ${tag} is undefined, ${tag} - ${value}`);
        if (typeof value === "boolean")
            return value;
        return value === "true";
    }
    convertToString(tag, value) {
        if (value == undefined)
            throw new ConfigError(`[convertToString] - ${tag} string is undefined.`);
        const result = new String(value).valueOf();
        if (result.length == 0)
            throw new ConfigError(`[convertToString] - ${tag} string is empty.`);
        return result;
    }
}
exports.default = BaseConfig;
