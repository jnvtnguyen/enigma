import { authorizationHeaders } from '@/util/headers';

export class HttpRequestHeader extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const InternalServerError = new HttpRequestHeader(500, 'Internal Server Error');

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ThrowErrorType = 'none' | 'json' | 'text' | 'errorObject';

export interface Options<T> {
  bodyPreformater?: (data: any) => any;
  throwErrorType?: ThrowErrorType;
  authorized?: boolean;
  customResponseHandler?: (response: Response) => any;
  errorTransformer?: (error: any) => any;
  successCustomHandler?: (response: Response) => any;
  successTransformer?: (json: any) => T;
  headers?: any;
}

export interface CreateHttpRequest {
  <T>(method: 'GET', options?: Options<T>): (url: string) => Promise<T>;
  <T>(method: 'POST', options?: Options<T>): (url: string, body: Partial<T> | any) => Promise<T>;
  <T>(method: 'PUT', options?: Options<T>): (url: string, body?: Partial<T> | any) => Promise<T>;
  <T>(method: 'DELETE', options?: Options<T>): (
    url: string,
    body?: Partial<T> | any
  ) => Promise<undefined>;
}

export type RequestOptions<T> = Options<T> & {
  method?: HTTPMethod;
  body?: any;
};

export const request = async <T = any>(
  url: string,
  { method = 'GET', body, ...options }: RequestOptions<T> = {}
): Promise<T | undefined> => {
  const {
    bodyPreformater,
    throwErrorType = 'json',
    authorized = true,
    customResponseHandler,
    errorTransformer,
    successTransformer,
    successCustomHandler,
    headers
  } = options || {};

  let baseHeaders = authorized ? authorizationHeaders() : {};
  let bodyToUse = body;

  if (bodyPreformater) {
    bodyToUse = bodyPreformater(body);
  } else if (typeof body == 'object') {
    bodyToUse = JSON.stringify(body);
  }

  if (['POST', 'PUT'].includes(method) && !body) {
    bodyToUse = JSON.stringify({});
  }

  const response = await fetch(url, {
    method,
    headers: headers
      ? { ...baseHeaders, ...headers }
      : {
          ...baseHeaders,
          'Content-Type': 'application/json'
        },
    body: bodyToUse
  });

  if (customResponseHandler) {
    return customResponseHandler(response);
  }

  if (!response.ok) {
    if (response.status === 500) {
      throw InternalServerError;
    }

    if (throwErrorType === 'none') {
      if (errorTransformer) {
        throw errorTransformer(response);
      }
    }

    if (throwErrorType === 'json') {
      const errorResult = (await response.json()) || {};
      if (errorTransformer) {
        throw errorTransformer(errorResult);
      } else {
        errorResult.status = response.status;
        throw errorResult;
      }
    }

    if (throwErrorType === 'text') {
      const errorText = await response.text();
      throw errorText;
    }

    if (throwErrorType === 'errorObject') {
      const errorText = await response.text();
      const errorResult = new HttpRequestHeader(response.status, errorText);
      throw errorResult;
    }
  }

  if (method !== 'DELETE') {
    if (successCustomHandler) {
      return successCustomHandler(response);
    }

    const result = await response.json();

    if (successTransformer) {
      return successTransformer(result);
    }

    return result;
  }
};

export const createHttpRequest: CreateHttpRequest =
  (method: HTTPMethod, options: Options<any>) => (url: string, body?: any) =>
    request(url, { ...options, method, body });

export const httpRequest = <T>(options?: Options<T>) => ({
  get: createHttpRequest<T>('GET', options),
  post: createHttpRequest<T>('POST', options),
  put: createHttpRequest<T>('PUT', options),
  delete: createHttpRequest<T>('DELETE', options)
});
