export { default, default as Kutt } from "./Kutt.js";
export { API, Domain, Health, Link, User } from "./api/index.js";

export type { ConfigI } from "./config.js";
export type { DomainI, NewDomainI } from "./api/Domain.js";
export type {
  LinkI,
  NewLinkI,
  UpdateLinkI,
  ListLinkParamsI,
  ListLinkResultI,
  LinkStatsI,
  LinkDurationStatsI,
  LinkStatDetailsI,
  LinkStatDetailI,
} from "./api/Link.js";
export type { UserI } from "./api/User.js";
