import API from "./api.js";

/**
 *
 * @see {@link https://docs.kutt.to/#tag/health}
 * @example
 * const health = new Health(config);
 */
export default class Health extends API {

  /**
   *
   * @protected
   */
  protected readonly prefix = "/health";

  /**
   * Checks API health.
   * @example
   * const isHealthy = await health.check();
   */
  public async check(): Promise<boolean> {
    return this.get()
      .then(() => true)
      .catch(() => false);
  }

}
