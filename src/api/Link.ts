import API from "#src/API";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/links}
 * @example
 * const links = new Link(config);
 */
export default class Link extends API {

  /**
   *
   * @protected
   */
  protected readonly prefix = "/links";

  /**
   * Creates a short link.
   *
   * @param link
   * @example
   * const link = await links.create({
   *   target: "string",
   *   description: "string",
   *   expire_in: "2 minutes/hours/days",
   *   password: "string",
   *   customurl: "string",
   *   reuse: false,
   *   domain: "string",
   * });
   */
  public async create(link: NewLinkT): Promise<LinkI> {
    return this.post<LinkI>(link);
  }

  /**
   * Gets list of links.
   *
   * @param params
   * @param [params.skip=0]
   * @param [params.limit=10]
   * @param [params.all=false]
   * @example
   * const list = await links.list();
   * @example
   * const list = await links.list({
   *   skip:  0,
   *   limit: 10,
   *   all:   10,
   * });
   */
  public async list(params: ListLinkParamsI = {}): Promise<ListLinkResultI> {
    const { skip = 0, limit = 10, all = false } = params;

    return this.get<ListLinkResultI>({
      skip,
      limit,
      all,
    });
  }

  /**
   * Deletes a link.
   *
   * @param id
   * @example
   * const message = await links.remove(link.id);
   */
  public async remove(id: string): Promise<string> {
    return this.delete<{ message: string }>(`/${ id }`)
      .then(data => data.message);
  }

  /**
   * Gets link stats.
   *
   * @param id
   * @example
   * const stats = await links.stats(link.id);
   */
  public async stats(id: string): Promise<LinkStatsI> {
    return this.delete<LinkStatsI>(`/${ id }/stats`);
  }

  /**
   * Updates a link.
   *
   * @param id
   * @param link
   * @example
   * const updatedLink = await links.update(link.id, {
   *   target: "string",
   *   address: "string",
   *   description: "string",
   *   expire_in: "2 minutes/hours/days",
   * });
   */
  public async update(id: string, link: UpdateLinkT): Promise<LinkI> {
    return this.patch<LinkI>(link, `/${ id }`);
  }

}

export interface ListLinkParamsI {
  all?: boolean;
  limit?: number;
  skip?: number;
}

export interface ListLinkResultI {
  data: LinkI[];
  limit: number;
  skip: number;
  total: number;
}

export interface LinkI {
  address: string;
  banned: boolean;
  created_at: string;
  description: string;
  id: string;
  link: string;
  password: boolean;
  target: string;
  updated_at: string;
  visit_count: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NewLinkT = {
  customurl?: string;
  description?: string;
  domain?: string;
  expire_in?: string;
  password?: string;
  reuse?: boolean;
  target: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UpdateLinkT = {
  address: string;
  description?: string;
  expire_in?: string;
  target: string;
};

export interface LinkStatsI {
  address: string;
  banned: boolean;
  created_at: string;
  id: string;
  link: string;
  password: boolean;
  target: string;
  updatedAt: string;
  updated_at: string;
  visit_count: number;
}

export interface LinkDurationStatsI {
  stats: LinkStatDetailsI[];
  views: number[];
}

export interface LinkStatDetailsI {
  browser: LinkStatDetailI[];
  country: LinkStatDetailI[];
  os: LinkStatDetailI[];
  referrer: LinkStatDetailI[];
}

export interface LinkStatDetailI {
  name: string;
  value: number;
}
