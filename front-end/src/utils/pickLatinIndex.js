export function pickLatinIndex(id, n) {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return sum % n;
}