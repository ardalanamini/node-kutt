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
    interface ListResult {
        list: Url[];
        countAll: number;
    }
    interface Stats {
        browser: Array<{
            name: string;
            value: number;
        }>;
        os: Array<{
            name: string;
            value: number;
        }>;
        country: Array<{
            name: string;
            value: number;
        }>;
        referrer: Array<{
            name: string;
            value: number;
        }>;
    }
    interface StatResult {
        total: number;
        id: string;
        shortUrl: string;
        target: string;
        lastDay: {
            stats: Stats;
            views: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
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
    type Callback<R = any> = (err: Error | null, result: R) => void;
}
declare class Kutt {
    /**
     * Sets global API address
     */
    static setAPI: (api: string) => string;
    /**
     * Sets global API key
     */
    static setKey: (key: string) => string;
    /**
     * Sets global custom domain
     */
    static setDomain: (domain?: string | undefined) => string | undefined;
    protected _config: {
        API: string;
        KEY: string;
        DOMAIN: string | undefined;
    };
    protected _request(method: string, path: string, callback: Kutt.Callback<any>): void;
    protected _request(method: string, path: string, data?: object): Promise<any>;
    protected _request(method: string, path: string, data: object, callback: Kutt.Callback<any>): void;
    /**
     * Sets instance's API address
     */
    setAPI(api: string): this;
    /**
     * Sets instance's API key
     */
    setKey(key: string): this;
    /**
     * Sets instance's custom domain
     */
    setDomain(domain?: string): this;
    /**
     * Retrieves the short urls
     */
    list(): Promise<Kutt.ListResult>;
    list(callback: Kutt.Callback<Kutt.ListResult>): void;
    /**
     * Creates a new short url
     */
    submit(data: Kutt.NewUrl): Promise<Kutt.Url>;
    submit(data: Kutt.NewUrl, callback: Kutt.Callback<Kutt.Url>): void;
    /**
     * Removes the short url
     */
    delete(id: string): Promise<Kutt.Url>;
    delete(id: string, callback: Kutt.Callback<Kutt.Url>): void;
    /**
     * Retrieves the short url's statistics
     */
    stats(id: string): Promise<Kutt.StatResult>;
    stats(id: string, callback: Kutt.Callback<Kutt.StatResult>): void;
}
export = Kutt;
