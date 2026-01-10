export interface EditableBoxProps {
  mouseDown: boolean,
  gridRect: DOMRect | undefined
}

export interface Position {
  x: number,
  y: number
}

export type XOrYLC = "x" | "y"
export type XOrYUC = "X" | "Y"

export interface GridTrapPayload {
  event: MouseEvent, 
  mousePos: Position, 
  rect: DOMRect, 
  gridRect: DOMRect, 
  borderWidth: number
}