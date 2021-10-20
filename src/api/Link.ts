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
   * Gets list of links.
   *
   * @param params
   * @param [params.skip=0]
   * @param [params.limit=10]
   * @param [params.all=false]
   */
  public list(params: ListLinkParamsI = {}): Promise<ListLinkResultI> {
    const { skip = 0, limit = 10, all = false } = params;

    return this.axios.get<ListLinkResultI>(this.url(), { params: { skip, limit, all } })
      .then(({ data }) => data);
  }

  /**
   * Creates a short link.
   *
   * @param link
   */
  public create(link: NewLinkI): Promise<LinkI> {
    return this.axios
      .post<LinkI>(this.url(), link)
      .then(({ data }) => data);
  }

  /**
   * Gets link stats.
   *
   * @param id
   */
  public stats(id: string): Promise<LinkStatsI> {
    return this.axios
      .get<LinkStatsI>(this.url(`/${id}/stats`))
      .then(({ data }) => data);
  }

  /**
   * Updates a link.
   *
   * @param id
   * @param link
   */
  public update(id: string, link: UpdateLinkI): Promise<LinkI> {
    return this.axios
      .patch<LinkI>(this.url(`/${id}`), link)
      .then(({ data }) => data);
  }

  /**
   * Deletes a link.
   *
   * @param id
   */
  public remove(id: string): Promise<string> {
    return this.axios
      .delete<{ message: string }>(this.url(`/${id}`))
      .then(({ data }) => data.message);
  }
}

export interface ListLinkParamsI {
  skip?: number;
  limit?: number;
  all?: boolean;
}

export interface ListLinkResultI {
  skip: number;
  limit: number;
  total: number;
  data: LinkI[];
}

export interface LinkI {
  id: string;
  link: string;
  address: string;
  target: string;
  description: string;
  visit_count: number;
  password: boolean;
  banned: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewLinkI {
  target: string;
  description?: string;
  expire_in?: string;
  password?: string;
  customurl?: string;
  reuse?: boolean;
  domain?: string;
}

export interface UpdateLinkI {
  target: string;
  address: string;
  description?: string;
  expire_in?: string;
}

export interface LinkStatsI {
  id: string;
  link: string;
  address: string;
  target: string;
  visit_count: number;
  password: boolean;
  banned: boolean;
  created_at: string;
  updatedAt: string;
  updated_at: string;
}

export interface LinkDurationStatsI {
  stats: LinkStatDetailsI[];
  views: number[];
}

export interface LinkStatDetailsI {
  browser: LinkStatDetailI[];
  os: LinkStatDetailI[];
  country: LinkStatDetailI[];
  referrer: LinkStatDetailI[];
}

export interface LinkStatDetailI {
  name: string;
  value: number;
}
