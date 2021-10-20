import API from "./API.js";
import type { DomainI } from "./Domain.js";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/users}
 */
export default class User extends API {
  /**
   *
   * @protected
   */
  protected readonly prefix = "/users";

  /**
   * Gets user info.
   */
  public info(): Promise<UserI> {
    return this.axios
      .get<UserI>(this.url())
      .then(({ data }) => data); // TODO: Dates?
  }
}

export interface UserI {
  apikey: string;
  email: string;
  domains: DomainI[];
}
