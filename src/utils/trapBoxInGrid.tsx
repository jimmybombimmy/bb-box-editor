import type { GridTrapPayload, XOrYLC, XOrYUC } from "../components/GridWorkspace/EditableBox/types"



export function trapInGrid(xOrY: XOrYLC, {event, mousePos, rect, gridRect, borderWidth}: GridTrapPayload ): number {

  const xOrYUpperCase = xOrY.toLocaleUpperCase() as XOrYUC
  const heightOrWidth = xOrY == "y" ? "height" : "width"

  const client: "clientX" | "clientY" = `client${xOrYUpperCase}`

  if(!rect) return 0

  if ((event[client] - mousePos[xOrY] + rect[xOrY]) < 0) {
    return 0
  } 
  else if (gridRect && event[client] - mousePos[xOrY] + rect[xOrY] + rect[heightOrWidth] > gridRect[heightOrWidth]) {
    return gridRect[heightOrWidth] - rect[heightOrWidth] - (borderWidth * 2)
  }

  return event[client] - mousePos[xOrY] + rect[xOrY]
}