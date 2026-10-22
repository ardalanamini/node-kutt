import { isKuttHealthyV2 } from "#api/requests/health";
import { API } from "./api.js";

/**
 * Provides Kutt v2 health checks using this instance's configuration.
 *
 * By default, the configuration is copied from {@link KUTT_CONFIG} when the
 * instance is created.
 *
 * @see {@link https://docs.kutt.to/#tag/health}
 * @example
 * ```ts
 * import { HealthAPI } from "kutt";
 *
 * const health = new HealthAPI();
 * const isHealthy = await health.checkV2();
 * ```
 */
export class HealthAPI extends API {

  /**
   * Checks the health of the Kutt v2 API using this instance's configuration.
   *
   * @returns `true` after a successful health request.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link isKuttHealthyV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt();
   * const isHealthy = await kutt.health().checkV2();
   * ```
   */
  public async checkV2(): Promise<boolean> {
    return isKuttHealthyV2(this.requestOptions);
  }

}
