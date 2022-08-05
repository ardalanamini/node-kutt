import API from "./API.js";
import { DomainI } from "./Domain.js";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/users}
 * @example
 * const users = new User(config);
 */
export default class User extends API {

  /**
   *
   * @protected
   */
  protected readonly prefix = "/users";

  /**
   * Gets user info.
   * @example
   * const info = await users.info();
   */
  public async info(): Promise<UserI> {
    // TODO: Dates?
    return this.axios
      .get<UserI>(this.url())
      .then(({ data }) => data);
  }

}

export interface UserI {
  apikey: string;
  domains: DomainI[];
  email: string;
}
