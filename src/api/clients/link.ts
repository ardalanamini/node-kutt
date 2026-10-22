import type { TAPIPaginatedResponseV2, TAPIPaginationOptionsV2 } from "#api/requests/types";
import {
  type TLinkStatsV2,
  type TLinkV2,
  type TNewLinkV2,
  type TUpdateLinkV2,
  createKuttLinkV2,
  getKuttLinkStatsV2,
  listKuttLinksV2,
  removeKuttLinkV2,
  updateKuttLinkV2,
} from "#api/requests/link";
import { API } from "./api.js";

/**
 * Provides Kutt v2 short-link operations using this instance's configuration.
 *
 * By default, the configuration is copied from {@link KUTT_CONFIG} when the
 * instance is created.
 *
 * @see {@link https://docs.kutt.to/#tag/links}
 * @example
 * ```ts
 * import { LinkAPI } from "kutt";
 *
 * const links = new LinkAPI().setAPIKey("YOUR_API_KEY");
 * const page = await links.listV2({ limit: 10 });
 * ```
 */
export class LinkAPI extends API {

  /**
   * Gets a page of short links using this instance's configuration.
   *
   * @param pagination - Page size, offset, and administrator visibility settings.
   * Pass `{}` to use the API server's defaults.
   * @returns A page of links with normalized dates and pagination metadata.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link listKuttLinksV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const page = await kutt.links().listV2({ limit: 10, skip: 0, all: false });
   * ```
   */
  public async listV2(pagination: TAPIPaginationOptionsV2): Promise<TAPIPaginatedResponseV2<TLinkV2>> {
    return listKuttLinksV2({
      ...pagination,
      ...this.requestOptions,
    });
  }

  /**
   * Creates or reuses a short link using this instance's configuration.
   *
   * @param link - The destination URL and optional short-link settings.
   * @returns The created or reused link, with `createdAt` and `updatedAt` converted to `Date` objects.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link createKuttLinkV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const link = await kutt.links().createV2({
   *   target: "https://example.com/article",
   *   customURL: "article",
   *   expireIn: "2 days",
   * });
   * ```
   */
  public async createV2(link: TNewLinkV2): Promise<TLinkV2> {
    return createKuttLinkV2(link, this.requestOptions);
  }

  /**
   * Deletes a short link using this instance's configuration.
   *
   * @param linkId - The link's unique ID.
   * @returns The deletion message returned by the API.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link removeKuttLinkV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const message = await kutt.links().removeV2("497f6eca-6276-4993-bfeb-53cbbbba6f08");
   * ```
   */
  public async removeV2(linkId: string): Promise<string> {
    return removeKuttLinkV2(linkId, this.requestOptions);
  }

  /**
   * Gets a short link's visit statistics using this instance's configuration.
   *
   * @param linkId - The link's unique ID.
   * @returns The link and its daily, weekly, monthly, and yearly statistics with normalized dates.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link getKuttLinkStatsV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const stats = await kutt.links().statsV2("497f6eca-6276-4993-bfeb-53cbbbba6f08");
   * ```
   */
  public async statsV2(linkId: string): Promise<TLinkStatsV2> {
    return getKuttLinkStatsV2(linkId, this.requestOptions);
  }

  /**
   * Updates a short link using this instance's configuration.
   *
   * @param linkId - The link's unique ID.
   * @param link - The short-link address, destination URL, and optional changes.
   * @returns The updated link, with `createdAt` and `updatedAt` converted to `Date` objects.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link updateKuttLinkV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const link = await kutt.links().updateV2(
   *   "497f6eca-6276-4993-bfeb-53cbbbba6f08",
   *   { address: "article", target: "https://example.com/updated-article" },
   * );
   * ```
   */
  public async updateV2(linkId: string, link: TUpdateLinkV2): Promise<TLinkV2> {
    return updateKuttLinkV2(linkId, link, this.requestOptions);
  }

}
