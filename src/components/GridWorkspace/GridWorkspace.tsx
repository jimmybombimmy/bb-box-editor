import { EditableBox } from "./EditableBox/EditableBox"

import "./GridWorkspace.css"

interface GridWorkspaceProps {
  mouseDown: boolean,
  handleMouseDown: () => void
}

export function GridWorkspace(props: GridWorkspaceProps) {
  const {mouseDown, handleMouseDown} = props

  return (
    <main id="grid-workspace" onMouseDown={handleMouseDown}>
        <EditableBox mouseDown={mouseDown}/>
    </main>
  )
}