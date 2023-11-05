export function upperFirstLetter(string: string): string {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

export function cleanDescription(string: string): string {
  return string.replace("\f", " ");
}
