export type RequestData = {
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    url: string;
    headers?: any;
    data?: any,
    useToken?: boolean
}

export class HttpError extends Error {
    constructor(
        public readonly url: string,
        public readonly status: number,
        public readonly statusText: string,
        public readonly data: any
    ) {
        super(`<HttpError
            "url": "${url}",
            "status": ${status},
            "statusText": "${statusText}",
            "data": ${JSON.stringify(data)}
        />`)
    }
    static isHttpError({ message }: Error): boolean {
        return message.indexOf("<HttpError") !== -1
    }
    static parse({ message }: Error): HttpError {
        const data = JSON.parse(`{${message.split("<HttpError")[1].split("/>")[0].trim()}}`)
        return new HttpError(
            data.url,
            data.status,
            data.statusText,
            data.data
        )
    }
}

export default interface IHttpRequester {
    request<T>(req: RequestData): Promise<T>;
}

