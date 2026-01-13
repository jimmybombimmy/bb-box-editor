import type { Position } from "../components/GridWorkspace/EditableBox/types";

export function isMouseInBox(rect: DOMRect, mousePos: Position) {
  const checkXAxis = mousePos.x > rect.left && mousePos.x < rect.right
  const checkYAxis = mousePos.y > rect.top && mousePos.y < rect.bottom

  if (checkXAxis && checkYAxis ) {
    return true
  }
  return false
}