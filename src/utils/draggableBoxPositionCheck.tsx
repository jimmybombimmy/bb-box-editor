import type { DraggableBoxPositionCheckPayload, Side } from "../components/GridWorkspace/EditableBox/types"

const pixelBuffer = 50 // maybe make this an env variable at some point

function dragInRangeCheck(value: number, target: number, scrollComp: number) {
  return value > target - pixelBuffer - scrollComp && value < target + pixelBuffer - scrollComp
}

export function draggableBoxPositionCheck({mousePos, rect, scrollComp}: DraggableBoxPositionCheckPayload) {

  const validSides: Side[] = []
  if (dragInRangeCheck(mousePos.y, rect.top, scrollComp.y)) validSides.push('top')
  else if (dragInRangeCheck(mousePos.y, rect.bottom, scrollComp.y)) validSides.push('bottom')
  if (dragInRangeCheck(mousePos.x, rect.left, scrollComp.x)) validSides.push('left')
  else if (dragInRangeCheck(mousePos.x, rect.right, scrollComp.x)) validSides.push('right')

  return validSides
}