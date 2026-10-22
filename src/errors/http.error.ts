import type { TRecord } from "#utils/typescript";

/**
 * Error returned when an HTTP request receives an unsuccessful response.
 *
 * API requests set the message to the response body, preserve the HTTP status,
 * and include the response `Headers` object in `metadata.headers`.
 *
 * @example
 * ```ts
 * import { HTTPError, isKuttHealthyV2 } from "kutt";
 *
 * try {
 *   await isKuttHealthyV2();
 * } catch (error) {
 *   if (HTTPError.isHTTPError(error)) {
 *     console.error(error.status, error.message);
 *   }
 * }
 * ```
 */
export class HTTPError extends Error {

  /**
   * Checks whether a value is an instance of this HTTP error class.
   *
   * @param value - Value to inspect.
   * @returns Whether the value is an {@link HTTPError}, narrowing its type when `true`.
   */
  public static isHTTPError(value: unknown): value is HTTPError {
    return value instanceof HTTPError;
  }

  /** Error name used to identify this class in error output. */
  public readonly name: string = "HTTPError";

  /**
   * Creates an HTTP error with a status code and optional metadata.
   *
   * @param message - Error message. API requests use the response body as text.
   * @param status - HTTP response status code.
   * @param metadata - Additional error details. API requests provide response headers as `headers`.
   */
  public constructor(message: string, public readonly status: number, public readonly metadata?: TRecord) {
    super(message);
  }

}
