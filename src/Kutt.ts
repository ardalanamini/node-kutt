import { Domain, Health, Link, User } from "./api/index.js";
import CONFIG, { ConfigI } from "./config.js";

/**
 *
 * @see {@link https://docs.kutt.it}
 * @example
 * const kutt = new Kutt();
 */
export default class Kutt {

  /**
   *
   * @private
   */
  #config: ConfigI = { ...CONFIG };

  /**
   * Gets default/global config.
   *
   * @param config
   * @example
   * const api = Kutt.get("api");
   */
  public static get<Config extends keyof ConfigI>(config: Config): ConfigI[Config] {
    return CONFIG[config];
  }

  /**
   * Sets default/global config.
   *
   * @param config
   * @param value
   * @example
   * Kutt.set("api", , "https://kutt.it/api/v2");
   * @example
   * Kutt.set("api", , "https://kutt.it/api/v2")
   *   .set("timeout", 1e4);
   */
  public static set<Config extends keyof ConfigI>(config: Config, value: ConfigI[Config]): typeof Kutt {
    CONFIG[config] = value;

    return this;
  }

  /**
   * Domains API.
   *
   * @see {@link https://docs.kutt.it/#tag/domains}
   * @example
   * const domains = kutt.domains();
   */
  public domains(): Domain {
    return new Domain(this.#config);
  }

  /**
   * Gets instance config.
   *
   * @param config
   * @example
   * const api = kutt.get("api");
   */
  public get<Config extends keyof ConfigI>(config: Config): ConfigI[Config] {
    return this.#config[config];
  }

  /**
   * Health API.
   *
   * @see {@link https://docs.kutt.it/#tag/health}
   * @example
   * const health = kutt.health();
   */
  public health(): Health {
    return new Health(this.#config);
  }

  /**
   * Links API.
   *
   * @see {@link https://docs.kutt.it/#tag/links}
   * @example
   * const links = kutt.links();
   */
  public links(): Link {
    return new Link(this.#config);
  }

  /**
   * Sets instance config.
   *
   * @param config
   * @param value
   * @example
   * kutt = kutt.set("api", , "https://kutt.it/api/v2");
   * @example
   * kutt = kutt.set("api", , "https://kutt.it/api/v2")
   *   .set("timeout", 1e4);
   */
  public set<Config extends keyof ConfigI>(config: Config, value: ConfigI[Config]): this {
    this.#config[config] = value;

    return this;
  }

  /**
   * Users API.
   *
   * @see {@link https://docs.kutt.it/#tag/users}
   * @example
   * const users = kutt.users();
   */
  public users(): User {
    return new User(this.#config);
  }

}
