import axios, { AxiosInstance } from "axios";
import { ConfigI } from "../config.js";

/**
 *
 */
export default abstract class API {

  /**
   *
   * @protected
   */
  protected readonly axios: AxiosInstance;

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

    this.axios = axios.create({
      baseURL: api,
      headers: {
        "X-API-Key": key,
      },
      timeout,
    });
  }

  /**
   *
   * @param url
   * @protected
   */
  protected url(url = ""): string {
    return `${ this.prefix }${ url }`;
  }

}
