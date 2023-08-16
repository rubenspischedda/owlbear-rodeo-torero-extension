export function getViewportPositionFromCenter({ x, y, scale, width, height }: { x: number, y: number, scale: number, width: number, height: number }) {
  const centerX = (width / 2) - x;
  const centerY = (height / 2) - y;
  return { x: centerX * scale, y: centerY * scale };
}
