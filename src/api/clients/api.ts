import type { TAPIOptions } from "#api/requests/types";
import { KUTT_CONFIG, KuttConfig } from "#utils/config";

/**
 * Base class for API groups with independent request configuration.
 */
export abstract class API extends KuttConfig {

  /**
   * Copies configuration values and their sealed states into this API group.
   *
   * @param config - Configuration to copy. Defaults to {@link KUTT_CONFIG}.
   */
  public constructor(config: KuttConfig = KUTT_CONFIG) {
    super(config);
  }

  /**
   * Gets the current base URL, API key, and timeout for this API group's requests.
   */
  protected get requestOptions(): TAPIOptions {
    return {
      baseURL: this.getBaseURL(),
      apiKey : this.getAPIKey(),
      timeout: this.getTimeout(),
    };
  }

}
