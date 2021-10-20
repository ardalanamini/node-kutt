import API from "./API.js";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/domains}
 */
export default class Domain extends API {
  /**
   *
   * @protected
   */
  protected readonly prefix = "/domains";

  /**
   * Creates a domain.
   *
   * @param domain
   */
  public create(domain: NewDomainI): Promise<DomainI> {
    return this.axios
      .post<DomainI>(this.url(), domain)
      .then(({ data }) => data);
  }

  /**
   * Deletes a domain.
   *
   * @param id
   */
  public remove(id: string): Promise<string> {
    return this.axios
      .delete<{ message: string }>(this.url(`/${id}`))
      .then(({ data }) => data.message);
  }
}

export interface NewDomainI {
  address: string;
  homepage?: string;
}

export interface DomainI {
  id: string;
  address: string;
  banned: boolean;
  created_at: string;
  updated_at: string;
  homepage?: string;
}
