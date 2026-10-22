import type { TDomainV2 } from "./domain.js";
import type { TAPIOptions } from "./types.js";
import { type TUserV2Raw, normalizeV2User } from "#utils/data";
import { request } from "#utils/http";

/**
 * Gets the authenticated user's information using the Kutt v2 API.
 *
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The user's API key, email, and domains with normalized dates.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { getKuttUserInfoV2 } from "kutt";
 *
 * const user = await getKuttUserInfoV2({ apiKey: "YOUR_API_KEY" });
 * console.log(user.email);
 * ```
 */
export async function getKuttUserInfoV2(options: TAPIOptions = {}): Promise<TUserV2> {
  return request<TUserV2Raw>("v2/users", options).then(normalizeV2User);
}

/** Authenticated user information returned by the Kutt v2 API. */
export interface TUserV2 {
  /** User's API key, renamed from `apikey`. */
  apiKey: string;

  /** User's email address. */
  email: string;

  /** User's custom domains, with their timestamps converted to `Date` objects. */
  domains: TDomainV2[];
}
