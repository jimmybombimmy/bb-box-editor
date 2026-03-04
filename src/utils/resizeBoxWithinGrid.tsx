import type { ResizeBoxPayload, Position} from "../components/GridWorkspace/EditableBox/types"

export function resizeBoxWithinGrid({event, mousePos, rect, gridRect, borderWidth, boxSize, positionDifference, sides, scrollComp}: ResizeBoxPayload) {
    const dragDifference: Position = {...boxSize}
    const positionDifferenceCopy: Position = {...positionDifference}
      
    const borderWidthTimes3 = borderWidth * 3
    if (sides.includes("left")) {
      const tempDD = rect.width + (mousePos.x - event.clientX)
      if (gridRect.left >= rect.right - tempDD - borderWidthTimes3 - scrollComp.x) {
        dragDifference.x = (rect.left - gridRect.left) + rect.width - borderWidthTimes3 - scrollComp.x
        positionDifferenceCopy.x = 0
      } else {
        dragDifference.x = tempDD
        positionDifferenceCopy.x = positionDifference.x - dragDifference.x + rect.width - (borderWidth * 2)
      }
    } else if (sides.includes("right")) {
      const edgeToMouseDistance = rect.right - mousePos.x
      if (gridRect.right <= event.clientX + borderWidthTimes3 + edgeToMouseDistance - scrollComp.x) {
        dragDifference.x = gridRect.right - rect.left - borderWidthTimes3 + scrollComp.x
      } else {
        dragDifference.x = rect.width - (mousePos.x - event.clientX)       
      }
    }
    if (sides.includes("top")) {
      const tempDD = rect.height + (mousePos.y - event.clientY)
      if (gridRect.top >= rect.bottom - tempDD - borderWidthTimes3 - scrollComp.y) {
        dragDifference.y = (rect.top - gridRect.top) + rect.height - borderWidthTimes3 - scrollComp.y
        positionDifferenceCopy.y = 0
      } else {
        dragDifference.y = tempDD
        positionDifferenceCopy.y = positionDifference.y - dragDifference.y + rect.height - (borderWidth * 2)
      }
    } else if (sides.includes("bottom")) {
      const edgeToMouseDistance = rect.bottom - mousePos.y
      if (gridRect.bottom <= event.clientY + borderWidthTimes3 + edgeToMouseDistance - scrollComp.y) {
        dragDifference.y = gridRect.bottom - rect.top - borderWidthTimes3 + scrollComp.y
      } else {
        dragDifference.y = rect.height - (mousePos.y - event.clientY)       
      }
    }
    
    return {
      dragDifference: dragDifference,
      positionDifferenceCopy: positionDifferenceCopy
    }
    
}