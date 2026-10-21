import { ConfigI } from "#src/config";
import { reviver } from "#src/utils";

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

/**
 *
 */
export default abstract class API {

  /**
   *
   * @protected
   */
  protected abstract readonly prefix: string;

  /**
   *
   * @param config
   */
  public constructor(protected readonly config: ConfigI) { }

  /**
   *
   * @param url
   * @protected
   */
  protected async delete<Response = unknown>(url?: string): Promise<Response> {
    return this.request<Response>({
      method: METHOD.DELETE,
      url,
    });
  }

  /**
   *=
   * @param url
   * @protected
   */
  protected get<Response = unknown>(url?: string): Promise<Response>;

  /**
   *
   * @param params
   * @param url
   * @protected
   */
  protected get<Response = unknown>(params: ParamsT, url?: string): Promise<Response>;
  protected async get<Response = unknown>(params?: ParamsT | string, url?: string): Promise<Response> {
    if (typeof params === "string") {
      url = params;
      // eslint-disable-next-line no-undefined
      params = undefined;
    }

    return this.request<Response>({
      url,
      params,
    });
  }

  /**
   *
   * @param data
   * @param url
   * @protected
   */
  protected async patch<Response = unknown>(data: BodyT, url?: string): Promise<Response> {
    return this.request<Response>({
      method: METHOD.PATCH,
      body  : data,
      url,
    });
  }

  /**
   *
   * @param data
   * @param url
   * @protected
   */
  protected async post<Response = unknown>(data: BodyT, url?: string): Promise<Response> {
    return this.request<Response>({
      method: METHOD.POST,
      body  : data,
      url,
    });
  }

  /**
   *
   * @param request
   * @protected
   */
  protected async request<Response = unknown>(request: RequestI): Promise<Response> {
    const { config: { key, timeout } } = this;
    const { method = METHOD.GET, body, params } = request;
    let { url = "" } = request;

    const abortController = (new AbortController);

    const init: RequestInit = {
      method,
      signal : abortController.signal,
      headers: {
        "X-API-Key"   : key,
        "Content-Type": "application/json",
      },
    };

    if (body != null) init.body = JSON.stringify(body);

    if (params != null) url += `?${ new URLSearchParams(params as Record<string, string>).toString() }`;

    const timeoutId = setTimeout(() => abortController.abort(), timeout);

    return fetch(this.url(url), init)
      .then(async (r) => {
        clearTimeout(timeoutId);

        let response: any = await r.text();

        if (r.headers.get("Content-Type")?.startsWith("application/json")) response = JSON.parse(response, reviver);

        if (!r.ok) {
          throw new Error(response?.error ?? "Something went wrong", {
            cause: {
              data  : response,
              status: r.status,
            },
          });
        }

        return response;
      })
      .catch((error) => {
        clearTimeout(timeoutId);

        throw error;
      });
  }

  /**
   *
   * @param url
   * @protected
   */
  protected url(url: string): string {
    const { config: { api }, prefix } = this;

    return `${ api }${ prefix }${ url }`;
  }

}

export interface RequestI {
  body?: BodyT;
  method?: METHOD;
  params?: ParamsT;
  url?: string;
}

export type BodyT = Record<string, unknown>;

export type ParamsT = Record<string, boolean | number | string>;
