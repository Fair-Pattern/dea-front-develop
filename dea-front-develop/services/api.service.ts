import { getSession } from "next-auth/client";

interface Options extends RequestInit {
    data?: object;
    token?: string;
    noContentType?: boolean;
}

interface RejectCallBack {
    (reason: object): void;
}

interface ResolveCallBack<T> {
    (value: T | PromiseLike<T>): void;
}

interface ClientError {
    message: string;
    [key: string]: any;
}

const apiError = {
    error: true,
    status: null,
    response: null,
};

const handleServerResponse = <T>(response: Response, resolve: ResolveCallBack<T>, reject: RejectCallBack) =>
    response
        .json()
        .then((responseBody: T) => {
            if (response.ok) {
                return resolve(responseBody);
            }
            // BadRequest
            return reject({
                ...apiError,
                status: response.status,
                response: responseBody,
            });
        })
        .catch(() =>
            // Server error
            reject({
                ...apiError,
                status: response.status,
                response: response.statusText,
            })
        );

const handleClientError = (error: ClientError, reject: RejectCallBack) =>
    reject({
        ...apiError,
        response: error.message,
    });

export const api = async <T>(url: string, options: Options = {}): Promise<T> => {
    const session: any = await getSession();

    /*
    Function for calling api requests
    usage:
     api("url", {data: {param: "value"}, method: "PUT"}).then(result => {
      console.log(result);
    }).catch((status, err) => {
      console.log(status, err);
    });
     */
    const apiOptions: Options = options;

    const defaultHeaders: any = {
        Accept: "application/json",
    };
    if (!options.noContentType) {
        defaultHeaders["Content-Type"] = "application/json";
    }

    if (!apiOptions.headers) {
        apiOptions.headers = {};
    }

    apiOptions.headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    if (apiOptions.data) {
        apiOptions.body = JSON.stringify(apiOptions.data);
        delete apiOptions.data;
        if (!apiOptions.method) apiOptions.method = "POST";
    }

    if (session?.user?.token) {
        apiOptions.headers = {
            ...options.headers,
            Authorization: `Bearer ${session.user.token}`,
        };
        delete apiOptions.token;
    }

    return new Promise<T>((resolve: ResolveCallBack<T>, reject: RejectCallBack) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, apiOptions)
            .then((response: Response) => handleServerResponse<T>(response, resolve, reject))
            .catch((error: ClientError) =>
                // e.g TypeError: "Failed to fetch"
                handleClientError(error, reject)
            );
    });
};

export const chatApi=async <T>(url: string, options: Options = {}): Promise<T> => {

    const apiOptions: Options = options;

    const defaultHeaders: any = {
        Accept: "application/json"
    };

    if (!apiOptions.headers) {
        apiOptions.headers = {};
    }

    apiOptions.headers = {
        ...defaultHeaders,
        ...options.headers
    };

    if (apiOptions.data) {
        apiOptions.body = JSON.stringify(apiOptions.data);
        delete apiOptions.data;
        if (!apiOptions.method) apiOptions.method = "POST";
    }

    return new Promise<T>((resolve: ResolveCallBack<T>, reject: RejectCallBack) => {
        fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/${url}`,apiOptions)
            .then((response: Response) => handleServerResponse<T>(response, resolve, reject))
            .catch((error: ClientError) =>
                // e.g TypeError: "Failed to fetch"
                handleClientError(error, reject)
            );
    });
};

export default null;
