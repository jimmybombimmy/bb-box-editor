import { useEffect, useRef, useState } from "react"
import useMousePosition from "../../../hooks/useMousePosition"

import "./EditableBox.css"
import type { EditableBoxProps, Position } from "./types"
import { trapInGrid } from "../../../utils/trapBoxInGrid"
import { isMouseInBox } from "../../../utils/isMouseInBox"

export function EditableBox(props: EditableBoxProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const [positionDifference, setPositionDifference] = useState<Position>({x: 0, y: 0})
  const [mouseInBox, setMouseInBox] = useState(false)
  const mousePos: Position = useMousePosition();
  
  const boxRef = useRef<HTMLInputElement>(null)
  let rect: DOMRect | undefined = boxRef.current?.getBoundingClientRect()
  
  let borderWidth = 0
  if (boxRef.current) {
    borderWidth = Number(getComputedStyle(boxRef.current).borderBlockWidth.replace("px", ""))
  }

  const {mouseDown, gridRect} = props

  // will seeing if mouse is inside of box actually have any use?
  useEffect(() => {
    if (rect) {
      const mouseInBoxCheck = isMouseInBox(rect, mousePos)
      setMouseInBox(mouseInBoxCheck)

    }
  }) 

  useEffect(() => {
    if (boxRef.current) {
      rect = boxRef.current.getBoundingClientRect();

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
        setMouseInBox(false)
        window.removeEventListener("mousemove", updatePosition)
      };
      
    }
  }, [isDraggable])

  if (!mouseDown && isDraggable) {
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
          <li>isMouseInBox + isDraggable: {String(mouseInBox)} </li>
        </ul>
      </main>
    </>
  )
}