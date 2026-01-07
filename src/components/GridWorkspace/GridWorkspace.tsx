import { useEffect, useRef } from "react"
import { EditableBox } from "./EditableBox/EditableBox"

import "./GridWorkspace.css"

interface GridWorkspaceProps {
  mouseDown: boolean,
  handleMouseDown: () => void
}

export function GridWorkspace(props: GridWorkspaceProps) {
  const {mouseDown, handleMouseDown} = props

  const thisGrid = useRef<HTMLInputElement>(null)
  let rect = thisGrid.current?.getBoundingClientRect()
  
  useEffect(() => {
      if(thisGrid.current) {
        rect = thisGrid.current?.getBoundingClientRect()
      }
  }, [])

  return (
    <main id="grid-workspace" ref={thisGrid} onMouseDown={handleMouseDown}>
        {rect ?
          <EditableBox mouseDown={mouseDown} gridRect={rect}/> : <></>
        }
    </main>
  )
}