import type { PreventBoxMovementWhenShrunkPayload } from '../components/GridWorkspace/EditableBox/types';

export function preventBoxMovementWhenShrunk({
  positionDifferenceCopy,
  positionDifference,
  dragDifference,
  boxSize,
  sides,
}: PreventBoxMovementWhenShrunkPayload) {
  // 200 needs to be whatever the size of the smallest box in the grid at some point
  const pd = { x: positionDifferenceCopy.x, y: positionDifferenceCopy.y };
  if (sides.includes('left') && dragDifference.x < 200) {
    pd.x = positionDifference.x + boxSize.x - 200;
  }
  if (sides.includes('top') && dragDifference.y < 200) {
    pd.y = positionDifference.y + boxSize.y - 200;
  }
  return pd;
}
