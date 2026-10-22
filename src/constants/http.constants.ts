import type { TEnum } from "#utils/typescript";

/* -------------------------------------------------- HTTP Methods -------------------------------------------------- */

/** Union of the HTTP method strings supported by the Kutt request helper. */
export type HTTP_METHOD = TEnum<typeof HTTP_METHOD>;

/** HTTP methods used by the Kutt API endpoints. */
export const HTTP_METHOD = {
  GET   : "GET",
  POST  : "POST",
  PATCH : "PATCH",
  DELETE: "DELETE",
} as const;
