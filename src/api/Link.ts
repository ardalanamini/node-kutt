import API from "./API.js";

/**
 *
 * @see {@link https://docs.kutt.it/#tag/links}
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
   */
  public async create(link: NewLinkI): Promise<LinkI> {
    return this.axios
      .post<LinkI>(this.url(), link)
      .then(({ data }) => data);
  }

  /**
   * Gets list of links.
   *
   * @param params
   * @param [params.skip=0]
   * @param [params.limit=10]
   * @param [params.all=false]
   */
  public async list(params: ListLinkParamsI = {}): Promise<ListLinkResultI> {
    const { skip = 0, limit = 10, all = false } = params;

    return this.axios.get<ListLinkResultI>(this.url(), {
      params: {
        skip,
        limit,
        all,
      },
    })
      .then(({ data }) => data);
  }

  /**
   * Deletes a link.
   *
   * @param id
   */
  public async remove(id: string): Promise<string> {
    return this.axios
      .delete<{ message: string }>(this.url(`/${ id }`))
      .then(({ data }) => data.message);
  }

  /**
   * Gets link stats.
   *
   * @param id
   */
  public async stats(id: string): Promise<LinkStatsI> {
    return this.axios
      .get<LinkStatsI>(this.url(`/${ id }/stats`))
      .then(({ data }) => data);
  }

  /**
   * Updates a link.
   *
   * @param id
   * @param link
   */
  public async update(id: string, link: UpdateLinkI): Promise<LinkI> {
    return this.axios
      .patch<LinkI>(this.url(`/${ id }`), link)
      .then(({ data }) => data);
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

export interface NewLinkI {
  customurl?: string;
  description?: string;
  domain?: string;
  expire_in?: string;
  password?: string;
  reuse?: boolean;
  target: string;
}

export interface UpdateLinkI {
  address: string;
  description?: string;
  expire_in?: string;
  target: string;
}

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
