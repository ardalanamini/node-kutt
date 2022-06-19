import API from "./API.js";
import { DomainI } from "./Domain.js";

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
