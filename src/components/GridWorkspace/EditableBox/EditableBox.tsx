import { useEffect, useRef, useState } from "react"

import "./EditableBox.css"

import useMousePosition from "../../../hooks/useMousePosition"
import useScrollPosition from "../../../hooks/useScrollPosition"

import type { EditableBoxProps, Position } from "./types"
import { moveBoxWithinGridByAxis } from "../../../utils/moveBoxWithinGridByAxis"
import { isMouseInBounds } from "../../../utils/isMouseInBounds"

let borderWidth = 0
export function EditableBox(props: EditableBoxProps) {
  const {mouseDown, gridRect} = props
  const [isDraggable, setIsDraggable] = useState(false)
  const [positionDifference, setPositionDifference] = useState<Position>({x: 0, y: 0})
  const [manuallyUpdatedScrollPos, setManuallyUpdatedScrollPos] = useState<Position>({x: 0, y: 0})

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

      // const updateBoxSize = (event: MouseEvent) => {
      //
      // }   
      
      const updatePosition = (event: MouseEvent ) => {
        if (isDraggable && gridRect && rect?.x && rect.y) {
          const scrollComp = {x: scrollPos.x - manuallyUpdatedScrollPos.x, y: scrollPos.y - manuallyUpdatedScrollPos.y }
          const moveBoxPayload = {event, mousePos, rect, gridRect, borderWidth, scrollComp}

          setPositionDifference({ 
            x: moveBoxWithinGridByAxis("x", moveBoxPayload),
            y: moveBoxWithinGridByAxis("y", moveBoxPayload)
          });
        }
      };

      const dragOrResizeBox = (event: MouseEvent) => {

          // Add conditional logic to determine whether resizable or draggable
          
          // if close to edges (or corners, later)
          // updateBoxSize(event)

          // if not close to edges
          updatePosition(event)


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
    <main id="editable-box" ref={boxRef} onMouseDown={() => setIsDraggable(true)} style={{left: positionDifference.x, top: positionDifference.y, position: "relative"}}>
      <h1>Box Info:</h1>
      <ul unselectable="on">
        <li>Draggable: {String(isDraggable)} </li>
        <li>Mouse Down: {String(mouseDown)} </li>
        <li>X Mouse Position: {Math.round(mousePos.x)}px </li>
        <li>Y Mouse Position: {Math.round(mousePos.y)}px </li>
        <li>X Dragged: {Math.round(positionDifference.x)}px </li>
        <li>Y Dragged: {Math.round(positionDifference.y)}px </li>
        <li>X Box Window Position: {rect?.x ? Math.round(rect?.x) : 0}px </li>
        <li>Y Box Window Position: {rect?.x ? Math.round(rect?.y) : 0}px </li>
      </ul>
    </main>
  )
}