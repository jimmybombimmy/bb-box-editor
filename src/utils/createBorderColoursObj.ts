import type { GridBorderColourStyles, Side } from "../components/GridWorkspace/EditableBox/types"
import { sidesArr } from "../components/GridWorkspace/EditableBox/EditableBox.styles"
import { title } from "./title"

// To be determined by user at some point???
let defaultColour: string = "darkblue"
let clickedColour: string = "lightblue"
let hoverColour: string = "blue"

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
  }

  if (sides === "all") {
    for (const colour of Object.keys(borderColourObj) as (keyof GridBorderColourStyles)[]) {
      borderColourObjCopy[colour] = highlightColour
    }
  }

  return borderColourObjCopy
}