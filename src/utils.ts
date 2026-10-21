const DATE_KEYS = new Set(["created_at", "updated_at"]);

/**
 *
 * @param key
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function reviver(key: string, value: any): any {
  if (DATE_KEYS.has(key)) return new Date(value);

  return value;
}
