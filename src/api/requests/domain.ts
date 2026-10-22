import type { TAPIOptions } from "./types.js";
import { HTTP_METHOD } from "#constants/http";
import { type TDomainV2Raw, normalizeV2Domain } from "#utils/data";
import { request } from "#utils/http";

/**
 * Creates a custom domain using the Kutt v2 API.
 *
 * @param domain - The custom domain address and optional homepage URL.
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The domain, with `createdAt` and `updatedAt` converted to `Date` objects.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { createKuttDomainV2 } from "kutt";
 *
 * const domain = await createKuttDomainV2(
 *   { address: "go.example.com", homepage: "https://example.com" },
 *   { apiKey: "YOUR_API_KEY" },
 * );
 * ```
 */
export async function createKuttDomainV2(domain: TNewDomainV2, options: TAPIOptions = {}): Promise<TDomainV2> {
  return request<TDomainV2Raw>("v2/domains", {
    ...options,
    method: HTTP_METHOD.POST,
    body  : domain,
  }).then(normalizeV2Domain);
}

/**
 * Deletes a custom domain using the Kutt v2 API.
 *
 * @param domainId - The domain's unique ID.
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The deletion message returned by the API.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { removeKuttDomainV2 } from "kutt";
 *
 * const message = await removeKuttDomainV2(
 *   "497f6eca-6276-4993-bfeb-53cbbbba6f08",
 *   { apiKey: "YOUR_API_KEY" },
 * );
 * ```
 */
export async function removeKuttDomainV2(domainId: string, options: TAPIOptions = {}): Promise<string> {
  return request<{ message: string; }>(`v2/domains/${ domainId }`, {
    ...options,
    method: HTTP_METHOD.DELETE,
  }).then(response => response.message);
}

/** Settings for registering a custom domain with the Kutt v2 API. */
export interface TNewDomainV2 {
  /** Custom hostname to register, such as `go.example.com`. */
  address: string;

  /** URL to redirect to when the custom domain is visited without a short-link address. */
  homepage?: string | undefined;
}

/** A custom domain returned by the Kutt v2 API with normalized dates. */
export interface TDomainV2 {
  /** Unique domain ID used for deletion. */
  id: string;

  /** Registered custom hostname. */
  address: string;

  /** Whether the domain is banned by the server. */
  banned: boolean;

  /** URL to redirect to when the custom domain is visited without a short-link address. */
  homepage?: string | undefined;

  /** Time the domain was created, converted from `created_at`. */
  createdAt: Date;

  /** Time the domain was last updated, converted from `updated_at`. */
  updatedAt: Date;
}
