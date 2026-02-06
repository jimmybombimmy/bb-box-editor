import type { GridTrapPayload, AxisLC, AxisUC } from "../components/GridWorkspace/EditableBox/types"

export function moveBoxWithinGridByAxis(axisLC: AxisLC, {event, mousePos, rect, gridRect, borderWidth, scrollComp}: GridTrapPayload ): number {

  const heightOrWidth = axisLC == "y" ? "height" : "width"
  const axisUC = axisLC.toUpperCase() as AxisUC

  const client = `client${axisUC}` as const

  if(!rect) return 0

  // prevent box leaking from top and left
  if ((event[client] - mousePos[axisLC] + rect[axisLC]) < (0 + gridRect[axisLC] + scrollComp[axisLC]) ) {
    return 0
  } 

  // prevent box leaking from bottom and right
  else if (gridRect && event[client] - mousePos[axisLC] + rect[axisLC] + rect[heightOrWidth] > gridRect[heightOrWidth] - (borderWidth * 2) + gridRect[axisLC] + scrollComp[axisLC]) {
    return gridRect[heightOrWidth] - rect[heightOrWidth] - (borderWidth * 2) 
  }

  else {
    return event[client] - mousePos[axisLC] + rect[axisLC] - gridRect[axisLC] - scrollComp[axisLC]
  }
}