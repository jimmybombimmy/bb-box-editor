import type { Property } from "csstype";

export interface EditableBoxProps {
  mouseDown: boolean;
  gridRect: DOMRect | null;
}

export interface Position {
  x: number;
  y: number;
}

export type AxisLC = "x" | "y";
export type AxisUC = "X" | "Y";

export type Side = "top" | "bottom" | "left" | "right";

export type ClientByAxis = "clientX" | "clientY";

export interface MoveBoxPayload {
  event: MouseEvent;
  mousePos: Position;
  rect: DOMRect;
  gridRect: DOMRect;
  borderWidth: number;
  scrollComp: Position;
}

export interface ResizeBoxPayload {
  event: MouseEvent;
  mousePos: Position;
  rect: DOMRect;
  gridRect: DOMRect;
  borderWidth: number;
  boxSize: Position;
  positionDifference: Position;
  sides: Side[];
  scrollComp: Position;
}

export interface DraggableBoxPositionCheckPayload {
  mousePos: Position;
  rect: DOMRect;
  scrollComp: Position;
}

export interface PreventBoxMovementWhenShrunkPayload {
  positionDifferenceCopy: Position;
  positionDifference: Position;
  dragDifference: Position;
  boxSize: Position;
  sides: Side[];
}

export type Pixels = `${number}px`;

export interface EditableBoxStyles {
  top: Pixels;
  left: Pixels;
  height: Pixels;
  width: Pixels;
}

export interface OuterEditableBoxStyles extends EditableBoxStyles {
  position: Property.Position;
}

export interface InnerEditableBoxStyles extends EditableBoxStyles {
  margin: Pixels;
}
