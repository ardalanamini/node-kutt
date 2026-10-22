import { HTTP_METHOD } from "#constants/http";
import { HTTPError } from "#errors/http";
import { KUTT_CONFIG } from "#utils/config";

/**
 * Sends an HTTP request to a Kutt endpoint with an optional API key and JSON body.
 *
 * JSON responses are decoded when the content type starts with `application/json`.
 * Other successful responses are returned as text. The response is asserted as
 * `T` without runtime shape validation.
 *
 * @typeParam T - Expected response type.
 * @param url - Endpoint path resolved against the base URL, or an absolute URL.
 * One leading slash is removed before the URL is resolved.
 * @param options - Request settings. Omitted connection settings use {@link KUTT_CONFIG}.
 * @returns The decoded JSON response or response text.
 * @throws {@link HTTPError} If the server returns an unsuccessful HTTP response.
 * The error contains the response body as its message, status, and response headers.
 * @throws If the URL, timeout, or body is invalid, the request fails or times out,
 * or the response cannot be decoded.
 */
export async function request<T = unknown>(url: string, options: TRequestOptions = {}): Promise<T> {
  const {
    baseURL = KUTT_CONFIG.getBaseURL(),
    apiKey = KUTT_CONFIG.getAPIKey(),
    timeout = KUTT_CONFIG.getTimeout(),
    method = HTTP_METHOD.GET,
    params,
    body,
  } = options;

  if (url.startsWith("/")) url = url.slice(1);

  const requestURL = new URL(url, baseURL.endsWith("/") ? baseURL : `${ baseURL }/`);

  for (const key in params) {
    if (!Object.hasOwn(params, key)) continue;

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const value = (params as Record<string, string | number | boolean>)[key];

    if (value == null) continue;

    requestURL.searchParams.set(key, value.toString());
  }

  const headers = new Headers();

  const init: RequestInit = {
    method,
    headers,
  };

  if (apiKey) headers.set("X-API-KEY", apiKey);

  if (body) {
    init.body = JSON.stringify(body);

    headers.set("Content-Type", "application/json");
  }

  init.signal = AbortSignal.timeout(timeout);

  init.signal.throwIfAborted();

  const response = await fetch(requestURL, init);

  if (!response.ok) throw new HTTPError(await response.text(), response.status, { headers: response.headers });

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  if (response.headers.get("Content-Type")?.startsWith("application/json")) return response.json() as T;

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return response.text() as T;
}

/** HTTP request settings and overrides for the shared Kutt request helper. */
export interface TRequestOptions {
  /** API root URL. Defaults to the current base URL in {@link KUTT_CONFIG}. */
  baseURL?: string | undefined;

  /** Key sent in `X-API-KEY`. Defaults to {@link KUTT_CONFIG}; an empty string omits the header. */
  apiKey?: string | undefined;

  /** Request timeout in milliseconds. Defaults to the current timeout in {@link KUTT_CONFIG}. */
  timeout?: number | undefined;

  /** HTTP method to use. Defaults to `GET`. */
  method?: HTTP_METHOD | undefined;

  /** Own enumerable query parameters. Nullish values are omitted; other values are stringified. */
  params?: object | undefined;

  /** Request body serialized as JSON with a `Content-Type: application/json` header. */
  body?: object | undefined;
}
