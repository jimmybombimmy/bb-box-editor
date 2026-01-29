import type { GridTrapPayload, AxisLC, AxisUC } from "../components/GridWorkspace/EditableBox/types"

export function moveBoxWithinGridByAxis(axisLC: AxisLC, {event, mousePos, rect, gridRect, borderWidth}: GridTrapPayload ): number {

  const heightOrWidth = axisLC == "y" ? "height" : "width"
  const axisUC = axisLC.toUpperCase() as AxisUC

  const client = `client${axisUC}` as const
  const scroll = `scroll${axisUC}` as const

  if(!rect) return 0

  // prevent box leaking from top and left
  if ((event[client] - mousePos[axisLC] + rect[axisLC]) < (0 - window[scroll]) ) {
    return 0
  } 

  // prevent box leaking from bottom and right
  else if (gridRect && event[client] - mousePos[axisLC] + rect[axisLC] + rect[heightOrWidth] > gridRect[heightOrWidth] - window[scroll] - (borderWidth * 2)) {
    return gridRect[heightOrWidth] - rect[heightOrWidth] - (borderWidth * 2)
  }

  return event[client] - mousePos[axisLC] + rect[axisLC] + window[scroll]
}