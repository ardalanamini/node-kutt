export { default, default as Kutt } from "#src/Kutt";
export { API, Domain, Health, Link, User } from "#src/api/index";

export type { ConfigI } from "#src/config";
export type { DomainI, NewDomainI } from "#src/api/Domain";
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
} from "#src/api/Link";
export type { UserI } from "#src/api/User";
