import type { Position } from '../components/GridWorkspace/EditableBox/types';
const boxMinimumSizePx = 200; // have this be set to the size of smallest box in grid

export const preventBoxOverShrinkage = (dragDifference: Position) => {
  const x =
    dragDifference.x <= boxMinimumSizePx ? boxMinimumSizePx : dragDifference.x;
  const y =
    dragDifference.y <= boxMinimumSizePx ? boxMinimumSizePx : dragDifference.y;

  return { x: x, y: y };
};
