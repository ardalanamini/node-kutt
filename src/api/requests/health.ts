import type { TAPIOptions } from "./types.js";
import { request } from "#utils/http";

/**
 * Checks the health of the Kutt v2 API.
 *
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns `true` after a successful health request.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { isKuttHealthyV2 } from "kutt";
 *
 * const isHealthy = await isKuttHealthyV2({ timeout: 10_000 });
 * ```
 */
export async function isKuttHealthyV2(options: TAPIOptions = {}): Promise<boolean> {
  return request("v2/health", options).then(() => true);
}
