/**
 * Object with string keys and values whose types must be checked before use.
 *
 * @inline
 */
export type TRecord = Record<string, unknown>;

/**
 * Union of an object's property value types, used for enum-like constant objects.
 *
 * @typeParam T - Object whose value types should be combined.
 */
export type TEnum<T extends object> = T[keyof T];
