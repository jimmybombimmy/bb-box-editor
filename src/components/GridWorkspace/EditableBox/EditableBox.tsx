import { useEffect, useRef, useState } from "react"
import useMousePosition from "../../../hooks/useMousePosition"

import "./EditableBox.css"


interface EditableBoxProps {
  mouseDown: boolean,
  gridRect: DOMRect
}

export function EditableBox(props: EditableBoxProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const [positionDifference, setPositionDifference] = useState({x: 0, y: 0})
  const mousePos = useMousePosition();
  
  const box = useRef<HTMLInputElement>(null)
  let rect = box.current?.getBoundingClientRect()
  
  let borderWidth = 0
  if (box.current) {
    borderWidth = Number(getComputedStyle(box.current).borderBlockWidth.replace("px", ""))
  }

  const {mouseDown, gridRect} = props

  useEffect(() => {
    if (box.current) {
      rect = box.current.getBoundingClientRect();

      const updatePosition = (event: MouseEvent ) => {
        if (isDraggable && rect?.x && rect.y) {
          setPositionDifference({ x: trapInGrid("x", event), y: trapInGrid("y", event)});
        }
      };
      window.addEventListener("mousemove", updatePosition);
      return () => {
        window.removeEventListener("mousemove", updatePosition)
      };
      
    }
  }, [isDraggable])

  function trapInGrid(xOrY: "x"|"y", event: MouseEvent) {
    const xOrYUpperCase: "X"| "Y" = xOrY.toLocaleUpperCase() as "X" | "Y"
    const heightOrWidth = xOrY == "y" ? "height" : "width"

    const client: "clientX" | "clientY" = `client${xOrYUpperCase}`

    if(!rect) return 0

    if ((event[client] - mousePos[xOrY] + rect[xOrY]) < 0) {
      return 0
    } 
    else if (event[client] - mousePos[xOrY] + rect[xOrY] + rect[heightOrWidth] > gridRect[heightOrWidth]) {
      return gridRect[heightOrWidth] - rect[heightOrWidth] - (borderWidth * 2)
    }

    return event[client] - mousePos[xOrY] + rect[xOrY]
  }

  if (!mouseDown && isDraggable) {
    setIsDraggable(false)
  }

  function boxMouseDown() {
    setIsDraggable(true)
  }

  return (
    <>
      <main id="editable-box" ref={box} onMouseDown={boxMouseDown} style={{left: positionDifference.x, top: positionDifference.y, position: "relative"}}>
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

        </ul>
      </main>
    </>
  )
}