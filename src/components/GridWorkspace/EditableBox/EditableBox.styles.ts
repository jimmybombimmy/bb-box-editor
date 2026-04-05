import type { InnerEditableBoxStyles, OuterEditableBoxStyles, Position, Pixels, Side, GridBorderColourStyles } from "./types"
import env from "../../../config/dotenv"

const pxString = (num: number): Pixels => {
  return `${num}px`
}

export const outerEditableBoxStyles = (positionDifference: Position, boxSize: Position): OuterEditableBoxStyles => {
  return {
    top: pxString(positionDifference.y),
    left: pxString(positionDifference.x),
    height: pxString(boxSize.y),
    width: pxString(boxSize.x),
    position: "relative",
  }
}

export const innerEditableBoxPositionStyles = (positionDifference: Position, boxSize: Position): InnerEditableBoxStyles => {
  return {
    top: pxString(positionDifference.y),
    left: pxString(positionDifference.x),
    height: pxString(boxSize.y - (env.BOX_RESIZE_BUFFER * 2)),
    width: pxString(boxSize.x - (env.BOX_RESIZE_BUFFER * 2)),
    margin: pxString(env.BOX_RESIZE_BUFFER)
  }
}

// To be determined by user at some point???
let highlightColour: string = "blue"


export const innerEditableBoxBorderColours: GridBorderColourStyles = {
  borderLeftColor: undefined,
  borderRightColor: undefined,
  borderTopColor: undefined,
  borderBottomColor: undefined
}

// Maybe another type for hovering???
export const createBorderColoursObject = (borderColourObj: GridBorderColourStyles, sides: Side[] | "all" | "none") => {
  const borderColourObjCopy: GridBorderColourStyles = { ...borderColourObj }

  if (sides === "all") {
    for (let colour of Object.keys(borderColourObj) as (keyof GridBorderColourStyles)[]) {
      borderColourObjCopy[colour] = highlightColour
    }
  } else if (sides === "none") {
    for (let colour of Object.keys(borderColourObj) as (keyof GridBorderColourStyles)[]) {
      borderColourObjCopy[colour] = "darkblue"
    }
  }

  return borderColourObjCopy
}