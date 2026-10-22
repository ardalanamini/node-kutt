import type { TAPIOptions, TAPIPaginatedOptionsV2, TAPIPaginatedResponseV2 } from "./types.js";
import { HTTP_METHOD } from "#constants/http";
import { type TLinkStatsV2Raw, type TLinkV2Raw, normalizeV2Link, normalizeV2LinkStats } from "#utils/data";
import { request } from "#utils/http";

/**
 * Gets a page of short links using the Kutt v2 API.
 *
 * @param options - Page size, offset, and administrator visibility settings, plus
 * per-request base URL, API key, and timeout in milliseconds. Omitted pagination
 * settings use the API server's defaults. Omitted connection settings use {@link KUTT_CONFIG}.
 * @returns A page of links with normalized dates and pagination metadata.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { listKuttLinksV2 } from "kutt";
 *
 * const page = await listKuttLinksV2({
 *   limit: 10,
 *   skip: 0,
 *   all: false,
 *   apiKey: "YOUR_API_KEY",
 * });
 * console.log(page.data, page.total);
 * ```
 */
export async function listKuttLinksV2(options: TAPIPaginatedOptionsV2 = {}): Promise<TAPIPaginatedResponseV2<TLinkV2>> {
  const { limit, skip, all, ...rest } = options;

  return request<TAPIPaginatedResponseV2<TLinkV2Raw>>("v2/links", {
    ...rest,
    params: {
      limit,
      skip,
      all,
    },
  }).then(result => ({
    ...result,
    data: result.data.map(normalizeV2Link),
  }));
}

/**
 * Creates a short link using the Kutt v2 API, or reuses an existing link when requested.
 *
 * @param link - The destination URL and optional short-link settings.
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The created or reused link, with `createdAt` and `updatedAt` converted to `Date` objects.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { createKuttLinkV2 } from "kutt";
 *
 * const link = await createKuttLinkV2(
 *   { target: "https://example.com/article", customURL: "article", expireIn: "2 days" },
 *   { apiKey: "YOUR_API_KEY" },
 * );
 * console.log(link.link);
 * ```
 */
export async function createKuttLinkV2(link: TNewLinkV2, options: TAPIOptions = {}): Promise<TLinkV2> {
  const { customURL, expireIn, ...body } = link;

  return request<TLinkV2Raw>("v2/links", {
    ...options,
    method: HTTP_METHOD.POST,
    body  : {
      ...body,
      customurl: customURL,
      expire_in: expireIn,
    },
  }).then(normalizeV2Link);
}

/**
 * Deletes a short link using the Kutt v2 API.
 *
 * @param linkId - The link's unique ID.
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The deletion message returned by the API.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { removeKuttLinkV2 } from "kutt";
 *
 * const message = await removeKuttLinkV2(
 *   "497f6eca-6276-4993-bfeb-53cbbbba6f08",
 *   { apiKey: "YOUR_API_KEY" },
 * );
 * ```
 */
export async function removeKuttLinkV2(linkId: string, options: TAPIOptions = {}): Promise<string> {
  return request<{ message: string; }>(`v2/links/${ linkId }`, {
    ...options,
    method: HTTP_METHOD.DELETE,
  }).then(response => response.message);
}

/**
 * Updates a short link using the Kutt v2 API.
 *
 * @param linkId - The link's unique ID.
 * @param link - The short-link address, destination URL, and optional changes.
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The updated link, with `createdAt` and `updatedAt` converted to `Date` objects.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { updateKuttLinkV2 } from "kutt";
 *
 * const link = await updateKuttLinkV2(
 *   "497f6eca-6276-4993-bfeb-53cbbbba6f08",
 *   { address: "article", target: "https://example.com/updated-article", expireIn: "2 days" },
 *   { apiKey: "YOUR_API_KEY" },
 * );
 * ```
 */
export async function updateKuttLinkV2(
  linkId: string,
  link: TUpdateLinkV2,
  options: TAPIOptions = {},
): Promise<TLinkV2> {
  const { expireIn, ...body } = link;

  return request<TLinkV2Raw>(`v2/links/${ linkId }`, {
    ...options,
    method: HTTP_METHOD.PATCH,
    body  : {
      ...body,
      expire_in: expireIn,
    },
  }).then(normalizeV2Link);
}

/**
 * Gets a short link's visit statistics using the Kutt v2 API.
 *
 * @param linkId - The link's unique ID.
 * @param options - Per-request base URL, API key, and timeout in milliseconds.
 * Omitted settings use {@link KUTT_CONFIG}.
 * @returns The link and its daily, weekly, monthly, and yearly statistics with normalized dates.
 * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
 * @throws If the request fails, times out, or the response cannot be decoded.
 * @example
 * ```ts
 * import { getKuttLinkStatsV2 } from "kutt";
 *
 * const stats = await getKuttLinkStatsV2(
 *   "497f6eca-6276-4993-bfeb-53cbbbba6f08",
 *   { apiKey: "YOUR_API_KEY" },
 * );
 * console.log(stats.lastDay.views);
 * ```
 */
export async function getKuttLinkStatsV2(linkId: string, options: TAPIOptions = {}): Promise<TLinkStatsV2> {
  return request<TLinkStatsV2Raw>(`v2/links/${ linkId }/stats`, options).then(normalizeV2LinkStats);
}

/** A short link returned by the Kutt v2 API with normalized field names and dates. */
export interface TLinkV2 {
  /** Unique link ID used for updates, deletion, and statistics requests. */
  id: string;

  /** Short-link path segment, such as `article` in `https://go.example.com/article`. */
  address: string;

  /** Whether the link is banned by the server. */
  banned: boolean;

  /** Description associated with the link. */
  description: string;

  /** Complete shortened URL, including the protocol and domain. */
  link: string;

  /** Whether visiting the link requires a password. */
  password: boolean;

  /** Destination URL that the short link redirects to. */
  target: string;

  /** Total visits reported by the API, renamed from `visit_count`. */
  visitCount: number;

  /** Time the link was created, converted from `created_at`. */
  createdAt: Date;

  /** Time the link was last updated, converted from `updated_at`. */
  updatedAt: Date;
}

/** Settings for creating or reusing a short link with the Kutt v2 API. */
export interface TNewLinkV2 {
  /** Requested short-link path segment, sent to the API as `customurl`. */
  customURL?: string;

  /** Description to associate with the link. */
  description?: string;

  /** Custom domain hostname to use for the short link. */
  domain?: string;

  /** Expiration duration, such as `2 days`, sent to the API as `expire_in`. */
  expireIn?: string;

  /** Password visitors must provide to follow the link. */
  password?: string;

  /** Whether to reuse an existing link for the same target, user, and domain. */
  reuse?: boolean;

  /** Destination URL to shorten. */
  target: string;
}

/** Required address and destination URL, plus optional settings for updating a short link. */
export interface TUpdateLinkV2 {
  /** Short-link path segment to use after the update. */
  address: string;

  /** Description to associate with the link. */
  description?: string;

  /** Expiration duration, such as `2 days`, sent to the API as `expire_in`. */
  expireIn?: string;

  /** Destination URL to use after the update. */
  target: string;
}

/** Link details and visit statistics returned by the Kutt v2 statistics endpoint. */
export interface TLinkStatsV2 extends Omit<TLinkV2, "description"> {
  /** Time the statistics were generated, converted from the statistics response's `updatedAt`. */
  statsUpdatedAt: Date;

  /** Visit statistics for the last day. */
  lastDay: TLinkDurationStatsV2;

  /** Visit statistics for the last month. */
  lastMonth: TLinkDurationStatsV2;

  /** Visit statistics for the last week. */
  lastWeek: TLinkDurationStatsV2;

  /** Visit statistics for the last year. */
  lastYear: TLinkDurationStatsV2;
}

/** Visitor breakdowns and visit counts for one statistics period. */
export interface TLinkDurationStatsV2 {
  /** Visit counts grouped by browser, country, operating system, and referrer. */
  stats: TLinkStatDetailsV2;

  /** Visit counts per time bucket, in the order returned by the API. */
  views: number[];
}

/** Visitor categories and their visit counts for a statistics period. */
export interface TLinkStatDetailsV2 {
  /** Visit counts grouped by browser. */
  browser: TLinkStatDetailV2[];

  /** Visit counts grouped by country. */
  country: TLinkStatDetailV2[];

  /** Visit counts grouped by operating system. */
  os: TLinkStatDetailV2[];

  /** Visit counts grouped by referring site. */
  referrer: TLinkStatDetailV2[];
}

/** A visitor category and its visit count. */
export interface TLinkStatDetailV2 {
  /** Category name returned by the API. */
  name: string;

  /** Number of visits in this category. */
  value: number;
}
