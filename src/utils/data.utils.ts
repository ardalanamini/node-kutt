import type { TDomainV2, TLinkDurationStatsV2, TLinkStatsV2, TLinkV2, TUserV2 } from "#api/requests/index";

/**
 * Normalizes a Kutt v2 user's API key field and custom domains.
 *
 * @param user - User response with the API's original field names.
 * @returns A new user object with `apiKey` and normalized domain dates.
 */
export function normalizeV2User(user: TUserV2Raw): TUserV2 {
  return {
    email  : user.email,
    apiKey : user.apikey,
    domains: user.domains.map(normalizeV2Domain),
  };
}

/**
 * Converts a Kutt v2 domain's timestamps to `Date` objects and camelCase fields.
 *
 * @param domain - Domain response with the API's original timestamp fields.
 * @returns A new domain object with `createdAt` and `updatedAt` dates.
 */
export function normalizeV2Domain(domain: TDomainV2Raw): TDomainV2 {
  return {
    id       : domain.id,
    address  : domain.address,
    banned   : domain.banned,
    homepage : domain.homepage,
    createdAt: new Date(domain.created_at),
    updatedAt: new Date(domain.updated_at),
  };
}

/**
 * Normalizes a Kutt v2 link statistics response's field names and timestamps.
 *
 * The period breakdowns and visit arrays are passed through without copying.
 *
 * @param linkStats - Link details and statistics with the API's original fields.
 * @returns A new statistics object with `visitCount`, `createdAt`, `updatedAt`,
 * and `statsUpdatedAt`. All three timestamps are converted to `Date` objects.
 */
export function normalizeV2LinkStats(linkStats: TLinkStatsV2Raw): TLinkStatsV2 {
  return {
    id            : linkStats.id,
    address       : linkStats.address,
    banned        : linkStats.banned,
    link          : linkStats.link,
    password      : linkStats.password,
    target        : linkStats.target,
    visitCount    : linkStats.visit_count,
    createdAt     : new Date(linkStats.created_at),
    updatedAt     : new Date(linkStats.updated_at),
    statsUpdatedAt: new Date(linkStats.updatedAt),
    lastDay       : linkStats.lastDay,
    lastMonth     : linkStats.lastMonth,
    lastWeek      : linkStats.lastWeek,
    lastYear      : linkStats.lastYear,
  };
}

/**
 * Normalizes a Kutt v2 link's visit count field and timestamps.
 *
 * @param link - Link response with the API's original field names.
 * @returns A new link object with `visitCount`, `createdAt`, and `updatedAt`.
 * Both timestamps are converted to `Date` objects.
 */
export function normalizeV2Link(link: TLinkV2Raw): TLinkV2 {
  return {
    id         : link.id,
    address    : link.address,
    banned     : link.banned,
    description: link.description,
    link       : link.link,
    password   : link.password,
    target     : link.target,
    visitCount : link.visit_count,
    createdAt  : new Date(link.created_at),
    updatedAt  : new Date(link.updated_at),
  };
}

/** Kutt v2 user response before API key and domain normalization. */
export interface TUserV2Raw {
  /** User's email address. */
  email: string;

  /** User's API key, normalized to `apiKey`. */
  apikey: string;

  /** User's custom domains with their original timestamp fields. */
  domains: TDomainV2Raw[];
}

/** Kutt v2 domain response before timestamp normalization. */
export interface TDomainV2Raw {
  /** Unique domain ID. */
  id: string;

  /** Registered custom hostname. */
  address: string;

  /** Whether the domain is banned by the server. */
  banned: boolean;

  /** URL used when the custom domain is visited without a short-link address. */
  homepage?: string | undefined;

  /** Creation timestamp, normalized to the `createdAt` date. */
  created_at: string;

  /** Last modification timestamp, normalized to the `updatedAt` date. */
  updated_at: string;
}

/** Kutt v2 link statistics response before field and timestamp normalization. */
export interface TLinkStatsV2Raw extends Omit<TLinkV2Raw, "description"> {
  /** Statistics generation timestamp, normalized to the `statsUpdatedAt` date. */
  updatedAt: string;

  /** Visit statistics for the last day. */
  lastDay: TLinkDurationStatsV2;

  /** Visit statistics for the last month. */
  lastMonth: TLinkDurationStatsV2;

  /** Visit statistics for the last week. */
  lastWeek: TLinkDurationStatsV2;

  /** Visit statistics for the last year. */
  lastYear: TLinkDurationStatsV2;
}

/** Kutt v2 link response before field and timestamp normalization. */
export interface TLinkV2Raw {
  /** Unique link ID. */
  id: string;

  /** Short-link path segment. */
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

  /** Total visits reported by the API, normalized to `visitCount`. */
  visit_count: number;

  /** Creation timestamp, copied to a new `Date` as `createdAt`. */
  created_at: Date;

  /** Last modification timestamp, copied to a new `Date` as `updatedAt`. */
  updated_at: Date;
}
