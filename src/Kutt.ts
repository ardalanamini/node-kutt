import CONFIG, { ConfigI } from "./config.js";
import { Domain, Health, Link, User } from "./api/index.js";

/**
 *
 * @see {@link https://docs.kutt.it}
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
   */
  public static get<Config extends keyof ConfigI>(config: Config): ConfigI[Config] {
    return CONFIG[config];
  }

  /**
   * Sets default/global config.
   *
   * @param config
   * @param value
   */
  public static set<Config extends keyof ConfigI>(config: Config, value: ConfigI[Config]): typeof Kutt {
    CONFIG[config] = value;

    return this;
  }

  /**
   * Domains API.
   *
   * @see {@link https://docs.kutt.it/#tag/domains}
   */
  public domains(): Domain {
    return new Domain(this.#config);
  }

  /**
   * Gets instance config.
   *
   * @param config
   */
  public get<Config extends keyof ConfigI>(config: Config): ConfigI[Config] {
    return this.#config[config];
  }

  /**
   * Health API.
   *
   * @see {@link https://docs.kutt.it/#tag/health}
   */
  public health(): Health {
    return new Health(this.#config);
  }

  /**
   * Links API.
   *
   * @see {@link https://docs.kutt.it/#tag/links}
   */
  public links(): Link {
    return new Link(this.#config);
  }

  /**
   * Sets instance config.
   *
   * @param config
   * @param value
   */
  public set<Config extends keyof ConfigI>(config: Config, value: ConfigI[Config]): this {
    this.#config[config] = value;

    return this;
  }

  /**
   * Users API.
   *
   * @see {@link https://docs.kutt.it/#tag/users}
   */
  public users(): User {
    return new User(this.#config);
  }

}
