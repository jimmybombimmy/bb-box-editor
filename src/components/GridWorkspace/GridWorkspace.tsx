import { useRef, useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { EditableBox } from "./EditableBox/EditableBox"

import "./GridWorkspace.css"

interface GridWorkspaceProps {
  mouseDown: boolean,
  setMouseDown: Dispatch<SetStateAction<boolean>>
}

export function GridWorkspace(props: GridWorkspaceProps) {
  const {mouseDown, setMouseDown} = props

  const gridRef = useRef<HTMLInputElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)

  function handleMouseDown(): void {
    if (gridRef.current) {
      setRect(gridRef.current?.getBoundingClientRect())
    }

    setMouseDown(true)
  }

  return (
    <main id="grid-workspace" ref={gridRef} onMouseDown={handleMouseDown}>
      <EditableBox mouseDown={mouseDown} gridRect={rect}/> : <></>
    </main>
  )
}