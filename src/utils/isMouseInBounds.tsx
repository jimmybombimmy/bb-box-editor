import type { Position } from "../components/GridWorkspace/EditableBox/types";

export function isMouseInBounds(mousePos: Position) {
  const verticalCheck =  mousePos.y > 0  && mousePos.y < window.innerHeight
  const horizontalCheck = mousePos.x > 0 && mousePos.x < window.innerWidth

  if (!verticalCheck || !horizontalCheck) {
    return false
  }

  return true
}