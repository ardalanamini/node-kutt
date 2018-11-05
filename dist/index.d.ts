declare namespace Kutt {
    interface NewUrl {
        target: string;
        customurl?: string;
        password?: string;
        reuse?: boolean;
    }
    interface Url {
        createdAt: string;
        id: string;
        target: string;
        password: boolean;
        count: number;
        shortUrl: string;
    }
    type Callback<R = any> = (err: Error | null, result?: R) => void;
}
declare class Kutt {
    static setAPI: (api: string) => string;
    static setKey: (key: string) => string;
    static setDomain: (domain?: string | undefined) => string | undefined;
    protected config: {
        API: string;
        KEY: string;
        DOMAIN: string | undefined;
    };
    protected axios: import("axios").AxiosInstance;
    setAPI(api: string): this;
    setKey(key: string): this;
    setDomain(domain?: string): this;
    getUrls(): Promise<Kutt.Url[]>;
    getUrls(callback: Kutt.Callback<Kutt.Url[]>): void;
    submit(data: Kutt.NewUrl): Promise<Kutt.Url>;
    submit(data: Kutt.NewUrl, callback: Kutt.Callback<Kutt.Url>): void;
    delete(id: string): Promise<Kutt.Url>;
    delete(id: string, callback: Kutt.Callback<Kutt.Url>): void;
}
export = Kutt;
