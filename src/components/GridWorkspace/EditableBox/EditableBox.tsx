import { useState } from "react"

import "./EditableBox.css"

interface EditableBoxProps {
  mouseDown: boolean,
}

export function EditableBox(props: EditableBoxProps) {
  const [isDraggable, setIsDraggable] = useState(false)

  const {mouseDown} = props

  if (!mouseDown && isDraggable) {
    setIsDraggable(false)
  }

  function boxMouseDown() {
    setIsDraggable(true)
  }

  return (
    <>
      <main id="editable-box" onMouseDown={boxMouseDown}>
        <h1>Box Info:</h1>
        <ul>
          <li>Draggable: {String(isDraggable)}</li>
          <li>Mouse Down: {String(mouseDown)}</li>
        </ul>
      </main>
    </>
  )
}