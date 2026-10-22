import type { TConfig } from "#utils/config";
import type { TRequestOptions } from "#utils/http";

/**
 * Per-request base URL, API key, and timeout overrides for API functions.
 *
 * Omitted settings use {@link KUTT_CONFIG} at request time.
 * @interface
 */
export type TAPIOptions = Pick<TRequestOptions, keyof TConfig>;

/**
 * Pagination and visibility settings passed to the Kutt v2 links endpoint.
 *
 * Omitted settings use the API server's defaults.
 */
export interface TAPIPaginationOptionsV2 {
  /** Maximum number of links to return. */
  limit?: number | undefined;

  /** Number of matching links to skip before returning results. */
  skip?: number | undefined;

  /** Whether to include links from all users. Requires administrator access. */
  all?: boolean | undefined;
}

/**
 * Pagination and per-request connection settings for listing Kutt v2 links.
 *
 * Omitted pagination settings use the API server's defaults. Omitted connection
 * settings use {@link KUTT_CONFIG} at request time.
 */
export type TAPIPaginatedOptionsV2 = TAPIOptions & TAPIPaginationOptionsV2;

/**
 * A page of Kutt v2 results with pagination metadata.
 *
 * @typeParam T - Type of each result in the page.
 */
export interface TAPIPaginatedResponseV2<T> {
  /** Results in the current page. */
  data: T[];

  /** Page size reported by the API. */
  limit: number;

  /** Number of matching results skipped before this page. */
  skip: number;

  /** Total number of matching results across all pages. */
  total: number;
}
