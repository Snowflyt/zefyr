/**
 * Get the prototype of an object.
 * @param x The object to get the prototype of.
 * @returns The prototype of the object.
 */
const getPrototype = (x: unknown) => Object.getPrototypeOf(Object(x));

export default getPrototype;
