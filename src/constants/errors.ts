// These are regex strings for errors which are difficult to catch up ultimately
// do not impact the user
export const IGNORE_ERROR_REGEXES = [
  /No matching key. session topic doesn't exist/i,
  /Please call connect\(\) before request\(\)/i,
];
