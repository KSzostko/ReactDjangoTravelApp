export function cutText(text, length) {
  if (text <= length) return text;

  return `${text.substring(0, length)}...`;
}
