import type { InnerEditableBoxStyles, OuterEditableBoxStyles, Position, Pixels, Side, GridBorderColourStyles } from "./types"
import env from "../../../config/dotenv"
import { title } from "../../../utils/title"

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

const sidesArr = ["left", "right", "top", "bottom"]

// To be determined by user at some point???
let defaultColour: string = "darkblue"
let clickedColour: string = "lightblue"
let hoverColour: string = "blue"

export const innerEditableBoxBorderColours: GridBorderColourStyles = {
  borderLeftColor: undefined,
  borderRightColor: undefined,
  borderTopColor: undefined,
  borderBottomColor: undefined,
}

// Should this be in styles?? Seems like it could be a util or something
export const createBorderColoursObject = (borderColourObj: GridBorderColourStyles, sides: Side[] | "all" | "none", hovering: boolean = false) => {
  let borderColourObjCopy: GridBorderColourStyles = { ...borderColourObj }
  let highlightColour: string;

  if (hovering) {
    highlightColour = hoverColour
  } else {
    highlightColour = clickedColour
  }

  if (sides === "none") {
    for (const colour of Object.keys(borderColourObj) as (keyof GridBorderColourStyles)[]) {
      borderColourObjCopy[colour] = defaultColour
    }
  }

  if (Array.isArray(sides)) {
    let nonHighlightedSides = [...sidesArr];

    for (const side of sides) {
      nonHighlightedSides = nonHighlightedSides.filter(e => e !== side)
      const borderSide = `border${title(side)}Color` as keyof GridBorderColourStyles
      borderColourObjCopy[borderSide] = highlightColour
    }

    for (const side of nonHighlightedSides) {
      const borderSide = `border${title(side)}Color` as keyof GridBorderColourStyles
      borderColourObjCopy[borderSide] = defaultColour
    }
  } else {
    console.log("is not sides")
  }

  if (sides === "all") {
    for (const colour of Object.keys(borderColourObj) as (keyof GridBorderColourStyles)[]) {
      borderColourObjCopy[colour] = highlightColour
    }
  }

  // console.log("output border obj", borderColourObjCopy)

  return borderColourObjCopy
}