export function stringFormat(val: string, length: number) {
  if (val.length > length) {
    return val.slice(0, length) + "...";
  } else {
    return val;
  }
}
