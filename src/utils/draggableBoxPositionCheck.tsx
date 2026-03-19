// import 'dotenv/config';

import type { DraggableBoxPositionCheckPayload, Side } from "../components/GridWorkspace/EditableBox/types"
import env from "../config/dotenv";

const pixelBuffer = env.BOX_RESIZE_BUFFER

function dragInRangeCheck(value: number, target: number, scrollComp: number) {
  return value > target - (pixelBuffer * 2) - scrollComp && value < target + (pixelBuffer * 2) - scrollComp
}

export function draggableBoxPositionCheck({mousePos, rect, scrollComp}: DraggableBoxPositionCheckPayload) {

  const validSides: Side[] = []
  if (dragInRangeCheck(mousePos.y, rect.top, scrollComp.y)) validSides.push('top')
  else if (dragInRangeCheck(mousePos.y, rect.bottom, scrollComp.y)) validSides.push('bottom')
  if (dragInRangeCheck(mousePos.x, rect.left, scrollComp.x)) validSides.push('left')
  else if (dragInRangeCheck(mousePos.x, rect.right, scrollComp.x)) validSides.push('right')

  return validSides
}