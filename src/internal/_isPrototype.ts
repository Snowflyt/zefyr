/**
 * Returns `true` if the given object is likely a prototype.
 * @param o The object to check.
 */
const isPrototype = (o: object) =>
  o ===
  ('constructor' in o && typeof o.constructor == 'function'
    ? o.constructor.prototype
    : Object.prototype);

export default isPrototype;
