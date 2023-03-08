import { request as requestHTTP, RequestOptions } from "node:http";
import { request as requestHTTPS } from "node:https";
import { URLSearchParams } from "node:url";
import Base, { METHOD, RequestI } from "#src/api/API";
import { ConfigI } from "#src/config";
import { reviver } from "#src/utils";

/**
 *
 */
export default abstract class API extends Base {

  /**
   *
   * @private
   */
  #request: typeof requestHTTP | typeof requestHTTPS;

  /**
   *
   * @param config
   */
  public constructor(config: ConfigI) {
    super(config);

    this.#request = config.api.startsWith("https") ? requestHTTPS : requestHTTP;
  }

  /**
   *
   * @param request
   * @protected
   */
  protected async request<Response = unknown>(request: RequestI): Promise<Response> {
    const { config: { key, timeout } } = this;
    const { method = METHOD.GET, body, params } = request;
    let { url = "" } = request;

    const options: RequestOptions = {
      method,
      timeout,
      headers: {
        "X-API-Key"   : key,
        "Content-Type": "application/json",
      },
    };

    let data: string | undefined;

    if (body != null) {
      data = JSON.stringify(body);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      options.headers!["Content-Length"] = Buffer.byteLength(data);
    }

    if (params != null) url += `?${ new URLSearchParams(params as Record<string, string>).toString() }`;

    return new Promise<Response>((resolve, reject) => {
      const req = this.#request(
        this.url(url),
        options,
        (res) => {
          res.setEncoding("utf8");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let rawData: any = "";

          res
            .once("error", error => reject(error))
            .once("end", () => {
              try {
                if (res.headers["content-type"]?.startsWith("application/json")) rawData = JSON.parse(rawData, reviver);

                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
                  reject(new Error(rawData?.error ?? "Something went wrong", {
                    cause: {
                      data  : rawData,
                      status: res.statusCode,
                    },
                  }));

                  return;
                }

                resolve(rawData);
              } catch (error) {
                reject(error);
              }
            })
            .on("data", (chunk) => {
              rawData += chunk;
            });
        },
      ).once("error", error => reject(error));

      if (data != null) req.write(data);

      req.end();
    });
  }

}
