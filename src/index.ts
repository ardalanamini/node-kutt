import Axios from "axios";

const CONFIG = {
  API: "https://kutt.it",
  KEY: "",
  DOMAIN: undefined as string | undefined,
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

  export type Callback<R = any> = (err: Error | null, result?: R) => void;
}

class Kutt {
  public static setAPI = (api: string) => CONFIG.API = api;

  public static setKey = (key: string) => CONFIG.KEY = key;

  public static setDomain = (domain?: string) => CONFIG.DOMAIN = domain;

  protected config = CONFIG;

  protected axios = Axios.create({
    baseURL: this.config.API,
    headers: {
      "X-API-Key": this.config.KEY,
    },
  });

  public setAPI(api: string) {
    this.config.API = api;

    return this;
  };

  public setKey(key: string) {
    this.config.KEY = key;

    return this;
  };

  public setDomain(domain?: string) {
    this.config.DOMAIN = domain;

    return this;
  };

  public getUrls(): Promise<Kutt.Url[]>;
  public getUrls(callback: Kutt.Callback<Kutt.Url[]>): void;
  public getUrls(callback?: Kutt.Callback<Kutt.Url[]>) {
    const request = this.axios.get("/api/url/geturls");

    if (!callback) return request as any;

    request
      .then((urls: any) => callback(null, urls))
      .catch((err: Error) => callback(err));
  };

  public submit(data: Kutt.NewUrl): Promise<Kutt.Url>;
  public submit(data: Kutt.NewUrl, callback: Kutt.Callback<Kutt.Url>): void;
  public submit(data: Kutt.NewUrl, callback?: Kutt.Callback<Kutt.Url>) {
    const request = this.axios.post("/api/url/submit", data);

    if (!callback) return request as any;

    request
      .then((url: any) => callback(null, url))
      .catch((err: Error) => callback(err));
  };

  public delete(id: string): Promise<Kutt.Url>;
  public delete(id: string, callback: Kutt.Callback<Kutt.Url>): void;
  public delete(id: string, callback?: Kutt.Callback<Kutt.Url>) {
    const request = this.axios.post("/api/url/deleteurl", {
      id,
      domain: this.config.DOMAIN,
    });

    if (!callback) return request as any;

    request
      .then((url: any) => callback(null, url))
      .catch((err: Error) => callback(err));
  };
}

export = Kutt;
