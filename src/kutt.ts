import { KUTT_CONFIG, KuttConfig } from "#utils/config";
import { DomainAPI, HealthAPI, LinkAPI, UserAPI } from "./api/clients/index.js";

/**
 * Configurable client for the Kutt domains, health, links, and users APIs.
 *
 * Each API group copies the client's configuration when it is created.
 * Later changes to the client affect API groups created after that change.
 *
 * @see {@link https://docs.kutt.to}
 * @example
 * ```ts
 * import { Kutt } from "kutt";
 *
 * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
 * const link = await kutt.links().createV2({ target: "https://example.com" });
 * ```
 */
export class Kutt extends KuttConfig {

  /**
   * Creates a client with a copy of {@link KUTT_CONFIG}, including sealed settings.
   *
   * Later changes to the global configuration do not affect this client.
   */
  public constructor() {
    super(KUTT_CONFIG);
  }

  /**
   * Creates a domains API group with a copy of this client's configuration.
   *
   * @returns A new {@link DomainAPI} instance.
   * @see {@link https://docs.kutt.to/#tag/domains}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const domains = kutt.domains();
   * ```
   */
  public domains(): DomainAPI {
    return new DomainAPI(this);
  }

  /**
   * Creates a health API group with a copy of this client's configuration.
   *
   * @returns A new {@link HealthAPI} instance.
   * @see {@link https://docs.kutt.to/#tag/health}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const health = new Kutt().health();
   * const isHealthy = await health.checkV2();
   * ```
   */
  public health(): HealthAPI {
    return new HealthAPI(this);
  }

  /**
   * Creates a links API group with a copy of this client's configuration.
   *
   * @returns A new {@link LinkAPI} instance.
   * @see {@link https://docs.kutt.to/#tag/links}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const links = kutt.links();
   * ```
   */
  public links(): LinkAPI {
    return new LinkAPI(this);
  }

  /**
   * Creates a users API group with a copy of this client's configuration.
   *
   * @returns A new {@link UserAPI} instance.
   * @see {@link https://docs.kutt.to/#tag/users}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const users = kutt.users();
   * ```
   */
  public users(): UserAPI {
    return new UserAPI(this);
  }

}
