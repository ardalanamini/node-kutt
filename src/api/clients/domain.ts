import { type TDomainV2, type TNewDomainV2, createKuttDomainV2, removeKuttDomainV2 } from "#api/requests/domain";
import { API } from "./api.js";

/**
 * Provides Kutt v2 custom domain operations using this instance's configuration.
 *
 * By default, the configuration is copied from {@link KUTT_CONFIG} when the
 * instance is created.
 *
 * @see {@link https://docs.kutt.to/#tag/domains}
 * @example
 * ```ts
 * import { DomainAPI } from "kutt";
 *
 * const domains = new DomainAPI().setAPIKey("YOUR_API_KEY");
 * const domain = await domains.createV2({ address: "go.example.com" });
 * ```
 */
export class DomainAPI extends API {

  /**
   * Creates a custom domain using this instance's configuration.
   *
   * @param domain - The custom domain address and optional homepage URL.
   * @returns The domain, with `createdAt` and `updatedAt` converted to `Date` objects.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link createKuttDomainV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const domain = await kutt.domains().createV2({
   *   address: "go.example.com",
   *   homepage: "https://example.com",
   * });
   * ```
   */
  public async createV2(domain: TNewDomainV2): Promise<TDomainV2> {
    return createKuttDomainV2(domain, this.requestOptions);
  }

  /**
   * Deletes a custom domain using this instance's configuration.
   *
   * @param domainId - The domain's unique ID.
   * @returns The deletion message returned by the API.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link removeKuttDomainV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const message = await kutt.domains().removeV2("497f6eca-6276-4993-bfeb-53cbbbba6f08");
   * ```
   */
  public async removeV2(domainId: string): Promise<string> {
    return removeKuttDomainV2(domainId, this.requestOptions);
  }

}
