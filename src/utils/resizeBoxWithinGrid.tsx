import type { ResizeBoxPayload, Position} from "../components/GridWorkspace/EditableBox/types"
import env from "../config/dotenv"

export function resizeBoxWithinGrid({event, mousePos, rect, gridRect, borderWidth, boxSize, positionDifference, sides, scrollComp}: ResizeBoxPayload) {
    const dragDifference: Position = {...boxSize}
    const positionDifferenceCopy: Position = {...positionDifference}
      
    const borderWidthTimes3 = borderWidth * 3
    if (sides.includes("left")) {
      const tempDD = rect.width + (mousePos.x - event.clientX)
      if (gridRect.left >= rect.right - tempDD - (borderWidth * 2) - scrollComp.x + env.BOX_RESIZE_BUFFER ) {
        dragDifference.x = (rect.left - gridRect.left) + rect.width - (borderWidth * 2) - scrollComp.x + env.BOX_RESIZE_BUFFER
        positionDifferenceCopy.x = 0 - env.BOX_RESIZE_BUFFER - borderWidth
      } else {
        dragDifference.x = tempDD
        positionDifferenceCopy.x = positionDifference.x - dragDifference.x + rect.width - (borderWidth * 2)
      }
    } else if (sides.includes("right")) {
      const edgeToMouseDistance = rect.right - mousePos.x
      if (gridRect.right <= event.clientX + (borderWidth * 2) + edgeToMouseDistance - scrollComp.x - env.BOX_RESIZE_BUFFER) {
        dragDifference.x = gridRect.right - rect.left - borderWidthTimes3 + scrollComp.x + env.BOX_RESIZE_BUFFER - borderWidth
      } else {
        dragDifference.x = rect.width - (mousePos.x - event.clientX)       
      }
    }
    if (sides.includes("top")) {
      const tempDD = rect.height + (mousePos.y - event.clientY)
      if (gridRect.top >= rect.bottom - tempDD - (borderWidth * 2) - scrollComp.y + env.BOX_RESIZE_BUFFER) {
        dragDifference.y = (rect.top - gridRect.top) + rect.height - (borderWidth * 2) - scrollComp.y + env.BOX_RESIZE_BUFFER
        positionDifferenceCopy.y = 0 - env.BOX_RESIZE_BUFFER - borderWidth
      } else {
        dragDifference.y = tempDD
        positionDifferenceCopy.y = positionDifference.y - dragDifference.y + rect.height - (borderWidth * 2)
      }
    } else if (sides.includes("bottom")) {
      const edgeToMouseDistance = rect.bottom - mousePos.y
      if (gridRect.bottom <= event.clientY + (borderWidth * 4) + edgeToMouseDistance - scrollComp.y - env.BOX_RESIZE_BUFFER) {
        dragDifference.y = gridRect.bottom - rect.top - (borderWidth * 4) + scrollComp.y + env.BOX_RESIZE_BUFFER
      } else {
        dragDifference.y = rect.height - (mousePos.y - event.clientY)       
      }
    }
    
    return {
      dragDifference: dragDifference,
      positionDifferenceCopy: positionDifferenceCopy
    }
    
}