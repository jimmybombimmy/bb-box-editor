import { useEffect, useRef, useState } from "react"
import useMousePosition from "../../../hooks/useMousePosition"

import "./EditableBox.css"

interface EditableBoxProps {
  mouseDown: boolean,
}

export function EditableBox(props: EditableBoxProps) {
  const [isDraggable, setIsDraggable] = useState(false)
  const { x, y } = useMousePosition();  


  const box = useRef<HTMLInputElement>(null)
  let rect = box.current?.getBoundingClientRect()

  const {mouseDown} = props

  
  useEffect(() => {
    if (box.current) {
      rect = box.current.getBoundingClientRect();
      console.log(rect)
    }

  }, [isDraggable])


  if (!mouseDown && isDraggable) {
    setIsDraggable(false)
  }

  function boxMouseDown() {
    setIsDraggable(true)
  }

  function handleMouseOver() {
    if (isDraggable) console.log("boxcurrent", rect)
  }

  return (
    <>
      <main id="editable-box" ref={box} onMouseDown={boxMouseDown} onMouseOver={handleMouseOver}>
        <h1>Box Info:</h1>
        <ul>
          <li>Draggable: {String(isDraggable)}</li>
          <li>Mouse Down: {String(mouseDown)}</li>
          <li>X Mouse Position: {x} </li>
          <li>Y Mouse Position: {y} </li>

        </ul>
      </main>
    </>
  )
}