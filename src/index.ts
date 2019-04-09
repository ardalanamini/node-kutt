import axios from "axios";

const GET = "get";
const POST = "post";

const CONFIG = {
  API: "https://kutt.it",
  KEY: "",
  DOMAIN: undefined as string | undefined,
  TIMEOUT: 1e4, // 10 seconds by default
};

namespace Kutt {
  export interface NewUrl {
    target: string;
    customurl?: string;
    password?: string;
    reuse?: boolean;
  }

  export interface Url {
    createdAt: string;
    id: string;
    target: string;
    password: boolean;
    count: number;
    shortUrl: string;
  }

  export interface ListResult {
    list: Url[];
    countAll: number;
  }

  export interface Stats {
    browser: Array<{ name: string; value: number }>;
    os: Array<{ name: string; value: number }>;
    country: Array<{ name: string; value: number }>;
    referrer: Array<{ name: string; value: number }>;
  }

  export interface StatResult {
    total: number;
    id: string;
    shortUrl: string;
    target: string;
    lastDay: {
      stats: Stats;
      views: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
      ];
    };
    lastWeek: {
      stats: Stats;
      views: [number, number, number, number, number, number, number];
    };
    lastMonth: {
      stats: Stats;
      views: number[];
    };
    allTime: {
      stats: Stats;
      views: number[];
    };
  }

  export type Callback<R = any> = (err: Error | null, result: R) => void;
}

class Kutt {
  /**
   * Sets global API address
   */
  public static setAPI = (api: string) => (CONFIG.API = api);

  /**
   * Sets global API key
   */
  public static setKey = (key: string) => (CONFIG.KEY = key);

  /**
   * Sets global custom domain
   */
  public static setDomain = (domain?: string) => (CONFIG.DOMAIN = domain);

  /**
   * Sets global timeout
   */
  public static setTimeout = (timeout: number) => (CONFIG.TIMEOUT = timeout);

  protected _config = Object.assign({}, CONFIG);

  protected _request(
    method: string,
    url: string,
    callback: Kutt.Callback<any>,
  ): void;
  protected _request(method: string, url: string, data?: object): Promise<any>;
  protected _request(
    method: string,
    url: string,
    data: object,
    callback: Kutt.Callback<any>,
  ): void;
  protected _request(
    method: string,
    url: string,
    data?: object | Kutt.Callback<any>,
    callback?: Kutt.Callback<any>,
  ) {
    if (typeof data === "function") {
      callback = data as Kutt.Callback<any>;
      data = undefined;
    }

    const { API, KEY, TIMEOUT } = this._config;

    const request = axios({
      method,
      data,
      url,
      baseURL: `${API}/api/url`,
      timeout: TIMEOUT,
      headers: {
        "X-API-Key": KEY,
      },
    });

    if (!callback) return request.then(response => response.data);

    request
      .then(response => (callback as any)(null, response.data))
      .catch((err: Error) => (callback as any)(err));
  }

  /**
   * Sets instance's API address
   */
  public setAPI(api: string) {
    this._config.API = api;

    return this;
  }

  /**
   * Sets instance's API key
   */
  public setKey(key: string) {
    this._config.KEY = key;

    return this;
  }

  /**
   * Sets instance's custom domain
   */
  public setDomain(domain?: string) {
    this._config.DOMAIN = domain;

    return this;
  }

  /**
   * Sets instance's timeout
   */
  public setTimeout(timeout: number) {
    this._config.TIMEOUT = timeout;

    return this;
  }

  /**
   * Retrieves the short urls
   */
  public list(): Promise<Kutt.ListResult>;
  public list(callback: Kutt.Callback<Kutt.ListResult>): void;
  public list(callback?: Kutt.Callback<Kutt.ListResult>) {
    return this._request(GET, "/geturls", callback as any) as any;
  }

  /**
   * Creates a new short url
   */
  public submit(data: Kutt.NewUrl): Promise<Kutt.Url>;
  public submit(data: Kutt.NewUrl, callback: Kutt.Callback<Kutt.Url>): void;
  public submit(data: Kutt.NewUrl, callback?: Kutt.Callback<Kutt.Url>) {
    return this._request(POST, "/submit", data, callback as any) as any;
  }

  /**
   * Removes the short url
   */
  public delete(id: string): Promise<Kutt.Url>;
  public delete(id: string, callback: Kutt.Callback<Kutt.Url>): void;
  public delete(id: string, callback?: Kutt.Callback<Kutt.Url>) {
    return this._request(
      POST,
      "/deleteurl",
      {
        id,
        domain: this._config.DOMAIN,
      },
      callback as any,
    ) as any;
  }

  /**
   * Retrieves the short url's statistics
   */
  public stats(id: string): Promise<Kutt.StatResult>;
  public stats(id: string, callback: Kutt.Callback<Kutt.StatResult>): void;
  public stats(id: string, callback?: Kutt.Callback<Kutt.StatResult>) {
    const domain = this._config.DOMAIN;

    return this._request(
      GET,
      `/stats?id=${id}${domain ? `&domain=${domain}` : ""}`,
      callback as any,
    ) as any;
  }
}

export = Kutt;
