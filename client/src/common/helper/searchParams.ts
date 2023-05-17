import { URLSearchParamsInit } from "react-router-dom";

export function appendSearchParams(params: URLSearchParams, newParams: { [key: string]: string }): URLSearchParamsInit {
    const result: { [key: string]: string } = {};
    const keys = Object.keys(newParams)
    params.forEach((value, key) => result[key] = value)
    keys.forEach(k => result[k] = newParams[k])
    return result
}

export function removeSearchParams(params: URLSearchParams, forRemoving: string[]): URLSearchParamsInit {
    const newParams: { [key: string]: string } = {};
    params.forEach((value, key) => {
        if (forRemoving.indexOf(key) !== -1) return;
        newParams[key] = value;
    });
    return newParams;
}