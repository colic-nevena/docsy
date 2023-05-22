export class ConfigError extends Error {
    constructor(message: string) {
        super(`[Config] Error - ${message}`);
    }
}

export default class BaseConfig {
    public convertToNumber(tag: string, value: string): number {
        const result = parseInt(value);
        if (isNaN(result))
            throw new ConfigError(`[convertToNumber] - ${tag} is not a number, ${tag} - ${value}`);
        return result;
    }

    public convertToFloat(tag: string, value: string): number {
        const result = parseFloat(value);
        if (isNaN(result))
            throw new ConfigError(`[convertToNumber] - ${tag} is not a number, ${tag} - ${value}`);
        return result;
    }

    public convertToBoolean(tag: string, value: string | boolean): boolean {
        if (value === undefined || value === null)
            throw new ConfigError(`[convertToBoolean] - ${tag} is undefined, ${tag} - ${value}`);
        if (typeof value === "boolean")
            return value;
        return value === "true";
    }
    
    public convertToString(tag: string, value: any): string {
        if (value == undefined)
            throw new ConfigError(`[convertToString] - ${tag} string is undefined.`)
        const result = new String(value).valueOf();
        if (result.length == 0)
            throw new ConfigError(`[convertToString] - ${tag} string is empty.`)
        return result;
    }
}