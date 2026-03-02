import { useEffect, useRef, useState } from "react"

import "./EditableBox.css"

import useMousePosition from "../../../hooks/useMousePosition"
import useScrollPosition from "../../../hooks/useScrollPosition"

import type { DraggableBoxPositionCheckPayload, EditableBoxProps, MoveBoxPayload, Position, ResizeBoxPayload, Side } from "./types"
import { moveBoxWithinGridByAxis } from "../../../utils/moveBoxWithinGridByAxis"
import { isMouseInBounds } from "../../../utils/isMouseInBounds"
import { draggableBoxPositionCheck } from "../../../utils/draggableBoxPositionCheck"
import { resizeBoxWithinGrid } from "../../../utils/resizeBoxWithinGrid"

let borderWidth = 0
export function EditableBox(props: EditableBoxProps) {
  const {mouseDown, gridRect} = props
  const [isDraggable, setIsDraggable] = useState(false)
  const [positionDifference, setPositionDifference] = useState<Position>({x: 0, y: 0})
  const [manuallyUpdatedScrollPos, setManuallyUpdatedScrollPos] = useState<Position>({x: 0, y: 0})
  const [boxSize, setBoxSize] = useState<Position>({x: 300, y: 300})

  const scrollPos: Position = useScrollPosition();
  const mousePos: Position = useMousePosition();
  
  const boxRef = useRef<HTMLInputElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (rect && boxRef.current) {
      borderWidth = Number(getComputedStyle(boxRef.current).borderBlockWidth.replace("px", ""))
    }
  }, [rect]) 
  
  useEffect(() => {
    if (boxRef.current) {
      setRect(boxRef.current.getBoundingClientRect())
      setManuallyUpdatedScrollPos({x: window.scrollX, y: window.scrollY})

      let scrollComp: Position = {x: 0, y: 0}
      
      const updatePosition = (event: MouseEvent ) => {
        if (isDraggable && gridRect && rect?.x && rect.y) {
          const moveBoxPayload: MoveBoxPayload = {event, mousePos, rect, gridRect, borderWidth, scrollComp}
          
          setPositionDifference({ 
            x: moveBoxWithinGridByAxis("x", moveBoxPayload),
            y: moveBoxWithinGridByAxis("y", moveBoxPayload)
          });
        }
      };

      const updateBoxSize = (event: MouseEvent, sides: Side[]) => {
        if (rect && gridRect) {
          const resizeBoxPayload: ResizeBoxPayload = {event, mousePos, rect, gridRect, borderWidth, boxSize, positionDifference, sides, scrollComp}
          const {dragDifference, positionDifferenceCopy} = resizeBoxWithinGrid(resizeBoxPayload)

          setBoxSize(dragDifference)
          setPositionDifference(positionDifferenceCopy)
        }
      }   
      
      const dragOrResizeBox = (event: MouseEvent) => {
        if (rect && isDraggable) {
          scrollComp = {x: scrollPos.x - manuallyUpdatedScrollPos.x, y: scrollPos.y - manuallyUpdatedScrollPos.y }
          
          const draggablePositionCheckPayload: DraggableBoxPositionCheckPayload = {mousePos, rect, scrollComp}
          const draggableSides: Side[] = draggableBoxPositionCheck(draggablePositionCheckPayload)

          if (scrollComp.x || scrollComp.y) {
            setBoxSize(boxSize)
          }

          if (draggableSides.length > 0) {
            updateBoxSize(event, draggableSides)
          } else {
            updatePosition(event)
          }          
        }           
      }

      window.addEventListener("mousemove", dragOrResizeBox);
      return () => {
        window.removeEventListener("mousemove", dragOrResizeBox)
      };
      
    }
    // eslint-disable-next-line -- states other vars should be added below which breaks dragging functionality
  }, [isDraggable])
  
  if ((!mouseDown || !isMouseInBounds(mousePos)) && isDraggable) {
    setIsDraggable(false)
  }

  return (
    <main id="editable-box" ref={boxRef} onMouseDown={() => setIsDraggable(true)} style={{left: positionDifference.x, top: positionDifference.y, position: "relative", width: `${boxSize.x}px`, height: `${boxSize.y}px`}}>
      {/* <h1>Box Info:</h1>
      <ul unselectable="on">
        <li>Draggable: {String(isDraggable)} </li>
        <li>Mouse Down: {String(mouseDown)} </li>
        <li>X Mouse Position: {Math.round(mousePos.x)}px </li>
        <li>Y Mouse Position: {Math.round(mousePos.y)}px </li>
        <li>X Dragged: {Math.round(positionDifference.x)}px </li>
        <li>Y Dragged: {Math.round(positionDifference.y)}px </li>
        <li>X Box Window Position: {rect?.x ? Math.round(rect?.x) : 0}px </li>
        <li>Y Box Window Position: {rect?.x ? Math.round(rect?.y) : 0}px </li>
      </ul> */}
    </main>
  )
}