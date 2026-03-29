import { GridItem } from "./GridItem/GridItem";
import "./GridTemplateArea.css";

// This is temporary, just for initial work - will be changed when user can put in their own values
const colAmount = 3;

const createSomeDivs = (num: number) => {
  const divs = [];
  // Rows won't just be the same amount as columns
  for (let i = 0; i < num ** 2; i++) {
    const colNo = (i % colAmount) + 1;
    const rowNo = Math.floor(i / colAmount) + 1;
    const gridSpaceKey = `GridC${colNo}R${rowNo}`;

    divs.push(<GridItem key={gridSpaceKey} divKey={`${gridSpaceKey}`} />);
  }
  return divs;
};

export function GridTemplateArea() {
  return (
    <div
      style={{
        // All grid values below should be possible to set by the user
        gridTemplateColumns: `repeat(${colAmount}, 1fr)`,
        gridTemplateRows: `repeat(${colAmount}, 1fr)`, // rows would probably need to be auto-created depending on how many elements a user has in the grid workspace
        gridGap: "10px",
      }}
      className="grid-template-area"
    >
      {createSomeDivs(colAmount).map((d) => d)}
    </div>
  );
}
