import API from "#src/API";

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
  public async create(domain: NewDomainT): Promise<DomainI> {
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

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NewDomainT = {
  address: string;
  homepage?: string;
};

export interface DomainI {
  address: string;
  banned: boolean;
  created_at: Date;
  homepage?: string;
  id: string;
  updated_at: Date;
}
