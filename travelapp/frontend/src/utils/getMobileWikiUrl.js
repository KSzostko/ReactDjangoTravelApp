export function getMobileWikiUrl(url) {
  const mobileUrl = ''.concat(url.substring(0, 11), 'm.', url.substring(11));

  return mobileUrl;
}
