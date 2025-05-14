export function pickLatinIndex(key, n) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % n;
  }
  return hash;
}