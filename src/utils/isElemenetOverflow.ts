export default function isOverflown(element: HTMLElement): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}
