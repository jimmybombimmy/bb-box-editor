import type { ResizeBoxPayload, Position } from "../components/GridWorkspace/EditableBox/types"

export function resizeBoxWithinGridBySides({event, mousePos, rect, gridRect, borderWidth, boxSize, positionDifference, sides}: ResizeBoxPayload) {
    const dragDifference: Position = {...boxSize}
    const positionDifferenceCopy: Position = {...positionDifference}

    if (sides.includes("left")) {
      dragDifference.x = rect.width + (mousePos.x - event.clientX)
      positionDifferenceCopy.x = positionDifference.x - dragDifference.x + rect.width - (borderWidth * 2)
    } else if (sides.includes("right")) {
      dragDifference.x = rect.width - (mousePos.x - event.clientX)
    }
    if (sides.includes("top")) {
      dragDifference.y = rect.height + (mousePos.y - event.clientY)
      positionDifferenceCopy.y = positionDifference.y - dragDifference.y + rect.height - (borderWidth * 2)
    } else if (sides.includes("bottom")) {
      dragDifference.y = rect.height - (mousePos.y - event.clientY)
    }
    
    return {
      dragDifference: dragDifference,
      positionDifferenceCopy: positionDifferenceCopy
    }
    
}