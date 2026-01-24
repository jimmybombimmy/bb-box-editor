import { useEffect, useRef, useState } from "react"
import useMousePosition from "../../../hooks/useMousePosition"

import "./EditableBox.css"
import type { EditableBoxProps, Position } from "./types"
import { trapInGrid } from "../../../utils/trapBoxInGrid"
import { isMouseInBounds } from "../../../utils/isMouseInBounds"

let borderWidth = 0
export function EditableBox(props: EditableBoxProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const [positionDifference, setPositionDifference] = useState<Position>({x: 0, y: 0})
  const mousePos: Position = useMousePosition();
  
  const boxRef = useRef<HTMLInputElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  
  const {mouseDown, gridRect} = props

  useEffect(() => {
    if (rect && boxRef.current) {
      borderWidth = Number(getComputedStyle(boxRef.current).borderBlockWidth.replace("px", ""))
    }
  }, [rect]) 

  useEffect(() => {
    if (boxRef.current) {
      setRect(boxRef.current.getBoundingClientRect())
    
      const updatePosition = (event: MouseEvent ) => {
        if (isDraggable && gridRect && rect?.x && rect.y) {
          const gridTrapPayload = {event, mousePos, rect, gridRect, borderWidth}
          setPositionDifference({ 
            x: trapInGrid("x", gridTrapPayload),
            y: trapInGrid("y", gridTrapPayload)
          });
        }
      };

      window.addEventListener("mousemove", updatePosition);
      return () => {
        window.removeEventListener("mousemove", updatePosition)
      };
      
    }
    // eslint-disable-next-line -- states other vars should be added below which breaks dragging functionality
  }, [isDraggable])

  if ((!mouseDown || !isMouseInBounds(mousePos)) && isDraggable) {
    setIsDraggable(false)
  }

  return (
    <>
      <main id="editable-box" ref={boxRef} onMouseDown={() => setIsDraggable(true)} style={{left: positionDifference.x, top: positionDifference.y, position: "relative"}}>
        <h1>Box Info:</h1>
        <ul unselectable="on">
          <li>Draggable: {String(isDraggable)}</li>
          <li>Mouse Down: {String(mouseDown)}</li>
          <li>X Mouse Position: {mousePos.x} </li>
          <li>Y Mouse Position: {mousePos.y} </li>
          <li>X Dragged: {positionDifference.x} </li>
          <li>Y Dragged: {positionDifference.y} </li>
          <li>This X: {rect?.x}</li>
          <li>This Y: {rect?.y}</li>
          <li>isMouseInBox (and Mouse Down): {String(isMouseInBounds(mousePos))} </li>
        </ul>
      </main>
    </>
  )
}