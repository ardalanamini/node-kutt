import API from "#src/API";
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
    return this.get<UserI>();
  }

}

export interface UserI {
  apikey: string;
  domains: DomainI[];
  email: string;
}
