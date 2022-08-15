import { ConfigI } from "#src/config";

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
  protected constructor(protected readonly config: ConfigI) { }

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
   * @param url
   * @protected
   */
  protected url(url: string): string {
    const { config: { api }, prefix } = this;

    return `${ api }${ prefix }${ url }`;
  }

  /**
   *
   * @param request
   * @protected
   */
  protected abstract request<Response = unknown>(request: RequestI): Promise<Response>;

}

export interface RequestI {
  body?: BodyT;
  method?: METHOD;
  params?: ParamsT;
  url?: string;
}

export type BodyT = Record<string, unknown>;

export type ParamsT = Record<string, boolean | number | string>;
