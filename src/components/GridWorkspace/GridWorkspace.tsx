import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { EditableBox } from "./EditableBox/EditableBox";
import { testDivInner } from "./GridWorkspace.styles";

import "./GridWorkspace.css";

interface GridWorkspaceProps {
  mouseDown: boolean;
  setMouseDown: Dispatch<SetStateAction<boolean>>;
}

// This is temporary, just for initial work
const colNum = 9;

const createSomeDivs = (num: number) => {
  const divs = [];
  for (let i = 0; i < num; i++) {
    divs.push(
      <div
        key={`div` + i + 1}
        style={{
          ...testDivInner,
        }}
      ></div>,
    );
  }
  return divs;
};

export function GridWorkspace(props: GridWorkspaceProps) {
  const { mouseDown, setMouseDown } = props;

  const gridRef = useRef<HTMLInputElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  function handleMouseDown(): void {
    if (gridRef.current) {
      setRect(gridRef.current?.getBoundingClientRect());
    }

    setMouseDown(true);
  }

  return (
    <main id="grid-workspace" ref={gridRef} onMouseDown={handleMouseDown}>
      <div
        style={{
          position: "absolute",
          display: "grid",
          // All grid values below should be possible to set by the user
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr", // rows would probably need to be auto-created depending on how many elements a user has in the grid workspace
          gridGap: "10px",
          inset: 0, // this is what makes the grid set its size relative to the parent, despite 'position: "absolute"'
        }}
        className="custom-grid"
      >
        {createSomeDivs(colNum).map((d) => d)}
      </div>

      <EditableBox mouseDown={mouseDown} gridRect={rect} />
    </main>
  );
}
