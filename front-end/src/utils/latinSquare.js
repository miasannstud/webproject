export function generateLatinSquare(n) {
  return Array.from({length: n}, (_, row) =>
    Array.from({length: n}, (_, col) =>
      (row + col) % n
    )
  );
}