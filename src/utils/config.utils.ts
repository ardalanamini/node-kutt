/**
 * Stores a base URL, API key, and request timeout with optional per-setting seals.
 *
 * New configurations default to `https://kutt.to/api/`, an empty API key, and a
 * timeout of 5,000 milliseconds. Sealed settings cannot be changed.
 */
export class KuttConfig {

  /** Configuration values and seal flags stored independently for this instance. */
  readonly #config: TConfig = {
    baseURL: ["https://kutt.to/api/", false],
    // 5 seconds by default
    // oxlint-disable-next-line no-magic-numbers
    timeout: [5e3, false],
    apiKey : ["", false],
  };

  /**
   * Creates an independent configuration, optionally copying an existing one.
   *
   * @param base - Configuration whose values and sealed states should be copied.
   * Omit to use the built-in defaults.
   */
  public constructor(base?: KuttConfig) {
    if (!base) return;

    this.#config.baseURL = [base.#config.baseURL[0], base.#config.baseURL[1]];
    this.#config.timeout = [base.#config.timeout[0], base.#config.timeout[1]];
    this.#config.apiKey = [base.#config.apiKey[0], base.#config.apiKey[1]];
  }

  /**
   * Gets the API base URL used to resolve endpoint paths such as `v2/links`.
   *
   * @returns The configured API base URL.
   */
  public getBaseURL(): string {
    return this.#get("baseURL");
  }

  /**
   * Gets the API key sent in the `X-API-KEY` request header.
   *
   * @returns The configured API key, or an empty string when no key is set.
   */
  public getAPIKey(): string {
    return this.#get("apiKey");
  }

  /**
   * Gets the request timeout in milliseconds.
   *
   * @returns The configured timeout passed to `AbortSignal.timeout`.
   */
  public getTimeout(): number {
    return this.#get("timeout");
  }

  /**
   * Sets the API base URL used to resolve endpoint paths such as `v2/links`.
   *
   * @param baseURL - API root URL, such as `https://kutt.to/api/`.
   * @param seal - Whether to prevent further changes to this setting. Defaults to `false`.
   * @returns This instance for chained configuration calls.
   * @throws If the base URL setting is already sealed.
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setBaseURL("https://kutt.example.com/api/", true);
   * ```
   */
  public setBaseURL(baseURL: string, seal?: boolean): this {
    return this.#set("baseURL", baseURL, seal);
  }

  /**
   * Sets the API key sent in the `X-API-KEY` request header.
   *
   * @param apiKey - API key to send. An empty string omits the header.
   * @param seal - Whether to prevent further changes to this setting. Defaults to `false`.
   * @returns This instance for chained configuration calls.
   * @throws If the API key setting is already sealed.
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * ```
   */
  public setAPIKey(apiKey: string, seal?: boolean): this {
    return this.#set("apiKey", apiKey, seal);
  }

  /**
   * Sets the request timeout in milliseconds.
   *
   * @param timeout - Timeout passed to `AbortSignal.timeout` when a request starts.
   * @param seal - Whether to prevent further changes to this setting. Defaults to `false`.
   * @returns This instance for chained configuration calls.
   * @throws If the timeout setting is already sealed.
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setTimeout(10_000);
   * ```
   */
  public setTimeout(timeout: number, seal?: boolean): this {
    return this.#set("timeout", timeout, seal);
  }

  /** Reads a setting's value without exposing its sealed state. */
  #get<T extends keyof TConfig>(key: T): TConfig[T][0] {
    return this.#config[key][0];
  }

  /** Updates an unsealed setting's value and sealed state. */
  #set<T extends keyof TConfig>(key: T, value: TConfig[T][0], seal = false): this {
    const config = this.#config[key];

    if (config[1]) throw new Error(`Config is sealed: ${ key }`);

    config[1] = seal;

    config[0] = value;

    return this;
  }

}

/**
 * Default configuration for standalone API functions, clients, and API groups constructed without a configuration.
 *
 * Standalone functions read these settings at request time. New {@link Kutt}
 * clients and API groups copy the settings and their sealed states when constructed.
 *
 * @example
 * ```ts
 * import { KUTT_CONFIG } from "kutt";
 *
 * KUTT_CONFIG.setAPIKey("YOUR_API_KEY").setTimeout(10_000);
 * ```
 */
export const KUTT_CONFIG = new KuttConfig();

/** Stored configuration values paired with their sealed states. */
export interface TConfig {
  /** API root URL and whether it is sealed. */
  baseURL: TConfigValue<string>;

  /** API key and whether it is sealed. */
  apiKey: TConfigValue<string>;

  /** Request timeout in milliseconds and whether it is sealed. */
  timeout: TConfigValue<number>;
}

/** A setting's value and whether further changes are prohibited. */
type TConfigValue<T> = [value: T, sealed: boolean];
