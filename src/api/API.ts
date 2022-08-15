import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ConfigI } from "#src/config";

/**
 *
 */
export default abstract class API {

  /**
   *
   * @private
   */
  #axios: AxiosInstance;

  /**
   *
   * @protected
   */
  protected abstract readonly prefix: string;

  /**
   *
   * @param config
   */
  public constructor(config: ConfigI) {
    const { api, key, timeout } = config;

    this.#axios = axios.create({
      baseURL: api,
      headers: {
        "X-API-Key": key,
      },
      timeout,
    });
  }

  /**
   *
   * @param res
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  async #res<Response = unknown>(res: Promise<AxiosResponse<Response>>): Promise<Response> {
    return res.then(({ data }) => data);
  }

  /**
   *
   * @param url
   * @private
   */
  #url(url = ""): string {
    return `${ this.prefix }${ url }`;
  }

  /**
   *
   * @param url
   * @protected
   */
  protected async delete<Response = unknown>(url?: string): Promise<Response> {
    return this.#res<Response>(this.#axios.delete(this.#url(url)));
  }

  /**
   *=
   * @param url
   * @protected
   */
  protected async get<Response = unknown>(url?: string): Promise<Response>;

  /**
   *
   * @param config
   * @param url
   * @protected
   */
  protected async get<Response = unknown>(config: AxiosRequestConfig, url?: string): Promise<Response>;
  protected async get<Response = unknown>(
    config?: AxiosRequestConfig | string,
    url?: string,
  ): Promise<Response> {
    if (typeof config === "string") {
      url = config;
      // eslint-disable-next-line no-undefined
      config = undefined;
    }

    return this.#res<Response>(this.#axios.get(this.#url(url), config));
  }

  /**
   *
   * @param data
   * @param url
   * @protected
   */
  protected async patch<Response = unknown, Data = unknown>(
    data: Data,
    url?: string,
  ): Promise<Response> {
    return this.#res<Response>(this.#axios.patch(this.#url(url), data));
  }

  /**
   *
   * @param data
   * @param url
   * @protected
   */
  protected async post<Response = unknown, Data = unknown>(data: Data, url?: string): Promise<Response> {
    return this.#res<Response>(this.#axios.post(this.#url(url), data));
  }

}
