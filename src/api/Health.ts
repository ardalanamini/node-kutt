import API from "./API.js";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/health}
 */
export default class Health extends API {
  /**
   *
   * @protected
   */
  protected readonly prefix = "/health";

  /**
   * Checks API health.
   */
  public check(): Promise<boolean> {
    return this.axios.get(this.url())
      .then(() => true)
      .catch(() => false);
  }
}
