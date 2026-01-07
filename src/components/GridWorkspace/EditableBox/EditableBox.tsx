import { useEffect, useRef, useState } from "react"
import useMousePosition from "../../../hooks/useMousePosition"

import "./EditableBox.css"


interface EditableBoxProps {
  mouseDown: boolean,
  gridRect: DOMRect
}

export function EditableBox(props: EditableBoxProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const mousePos = useMousePosition();  
  const [positionDifference, setPositionDifference] = useState({x: 0, y: 0})

  const box = useRef<HTMLInputElement>(null)
  let rect = box.current?.getBoundingClientRect()

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


  const {mouseDown, gridRect} = props

  function trapInGrid(xOrY: "x"|"y", event: MouseEvent) {
    const xOrYUpperCase: "X"| "Y" = xOrY.toLocaleUpperCase() as "X" | "Y"
    const topOrLeft = xOrY == "x" ? "left" : "top"
    const bottomOrRight = xOrY == "y" ? "right" : "bottom"

    const client: "clientX" | "clientY" = `client${xOrYUpperCase}`

    console.log(client, xOrY, topOrLeft, bottomOrRight)

    if(!rect) return 0
    // console.log("eeee", event.clientX, mousePos[xOrY], rect.x, event.clientX - mousePos[xOrY] + rect.x, gridRect.left)

    if ((event[client] - mousePos[xOrY] + rect[xOrY]) < 0) {
      return 0
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