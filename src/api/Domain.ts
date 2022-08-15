import API from "./API.js";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/domains}
 * @example
 * const domains = new Domain(config);
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
   * @example
   * const domain = await domains.create({
   *   address: "string",
   *   homepage: "string",
   * });
   */
  public async create(domain: NewDomainI): Promise<DomainI> {
    return this.post(domain);
  }

  /**
   * Deletes a domain.
   *
   * @param id
   * @example
   * const message = await domains.remove(domain.id);
   */
  public async remove(id: string): Promise<string> {
    return this.delete<{ message: string }>(`/${ id }`)
      .then(data => data.message);
  }

}

export interface NewDomainI {
  address: string;
  homepage?: string;
}

export interface DomainI {
  address: string;
  banned: boolean;
  created_at: string;
  homepage?: string;
  id: string;
  updated_at: string;
}
