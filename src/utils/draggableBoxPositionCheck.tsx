import type { DraggableBoxPositionCheckPayload, Side } from "../components/GridWorkspace/EditableBox/types"

const pixelBuffer = 30

function dragInRangeCheck(value: number, target: number) {
  return value > target - pixelBuffer && value < target + pixelBuffer
}

export function draggableBoxPositionCheck({mousePos, rect}: DraggableBoxPositionCheckPayload) {

  const validSides: Side[] = []
  if (dragInRangeCheck(mousePos.y, rect.top)) validSides.push('top')
  else if (dragInRangeCheck(mousePos.y, rect.bottom)) validSides.push('bottom')
  if (dragInRangeCheck(mousePos.x, rect.left)) validSides.push('left')
  else if (dragInRangeCheck(mousePos.x, rect.right)) validSides.push('right')

  return validSides
}