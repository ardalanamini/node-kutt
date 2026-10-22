import { type TUserV2, getKuttUserInfoV2 } from "#api/requests/user";
import { API } from "./api.js";

/**
 * Provides Kutt v2 user information using this instance's configuration.
 *
 * By default, the configuration is copied from {@link KUTT_CONFIG} when the
 * instance is created.
 *
 * @see {@link https://docs.kutt.to/#tag/users}
 * @example
 * ```ts
 * import { UserAPI } from "kutt";
 *
 * const users = new UserAPI().setAPIKey("YOUR_API_KEY");
 * const user = await users.infoV2();
 * ```
 */
export class UserAPI extends API {

  /**
   * Gets the authenticated user's information using this instance's configuration.
   *
   * @returns The user's API key, email, and domains with normalized dates.
   * @throws {@link HTTPError} If the API returns an unsuccessful HTTP response.
   * @throws If the request fails, times out, or the response cannot be decoded.
   * @see {@link getKuttUserInfoV2}
   * @example
   * ```ts
   * import { Kutt } from "kutt";
   *
   * const kutt = new Kutt().setAPIKey("YOUR_API_KEY");
   * const user = await kutt.users().infoV2();
   * ```
   */
  public async infoV2(): Promise<TUserV2> {
    return getKuttUserInfoV2(this.requestOptions);
  }

}
