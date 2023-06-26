export function deepFreeze<T>(obj: T): Readonly<T> {
  if (!obj || typeof obj !== "object") return obj;
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = obj[name as keyof T];
    deepFreeze(value);
  }
  return Object.freeze(obj);
}
