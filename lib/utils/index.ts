export function hasOwnProperty(obj: Record<string, any>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
