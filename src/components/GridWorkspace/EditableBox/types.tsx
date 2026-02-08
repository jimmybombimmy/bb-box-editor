export interface EditableBoxProps {
  mouseDown: boolean,
  gridRect: DOMRect | null
}

export interface Position {
  x: number,
  y: number
}

export type AxisLC = "x" | "y"
export type AxisUC = "X" | "Y"

export type Side = 'top' | 'bottom' | 'left' | 'right'

export interface GridTrapPayload {
  event: MouseEvent, 
  mousePos: Position, 
  rect: DOMRect, 
  gridRect: DOMRect, 
  borderWidth: number,
  scrollComp: Position
}

export interface DraggableBoxPositionCheckPayload { 
  mousePos: Position, 
  rect: DOMRect, 
}