export function openWithNewTab(url: string) {
  return window.open(url, '_blank');
}

/**
 * 요소 위로 스크롤 (애니메이션)
 */
export function scrollToElement(selector: string) {
  const elDest = document.querySelector(selector);
  if (!elDest) return;

  const rect = elDest.getBoundingClientRect();

  let top = rect.top + window.pageYOffset - 60;
  if (top < 0) top = 0;

  scrollToY(top);
}

/**
 * Y 값으로 스크롤 (애니메이션)
 */
export function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: 'smooth' });
}
