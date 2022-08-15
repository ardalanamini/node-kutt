import Base, { METHOD, RequestI } from "./API.js";

/**
 *
 */
export default abstract class API extends Base {

  /**
   *
   * @param request
   * @protected
   */
  protected async request<Response = unknown>(request: RequestI): Promise<Response> {
    const { config: { key, timeout } } = this;
    const { method = METHOD.GET, body, params } = request;
    let { url = "" } = request;

    const abortController = (new AbortController);

    const init: RequestInit = {
      method,
      signal : abortController.signal,
      headers: {
        "X-API-Key"   : key,
        "Content-Type": "application/json",
      },
    };

    if (body != null) init.body = JSON.stringify(body);

    if (params != null) url += `?${ new URLSearchParams(params as Record<string, string>).toString() }`;

    const timeoutId = setTimeout(() => abortController.abort(), timeout);

    return fetch(this.url(url), init)
      .then(async (r) => {
        clearTimeout(timeoutId);

        return r.json();
      })
      .catch((error) => {
        clearTimeout(timeoutId);

        throw error;
      });
  }

}
