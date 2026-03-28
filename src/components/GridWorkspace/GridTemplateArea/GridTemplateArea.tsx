import { GridItem } from "./GridItem/GridItem";
import "./GridTemplateArea.css";

// This is temporary, just for initial work - will be changed when user can put in their own values
const colNum = 3;

const createSomeDivs = (num: number) => {
  const divs = [];
  // Rows won't just be the same amount as columns
  for (let i = 0; i < num ** 2; i++) {
    // Do some calculations to make custom keys by column and row number
    divs.push(<GridItem />);
  }
  return divs;
};

export function GridTemplateArea() {
  return (
    <div
      style={{
        // All grid values below should be possible to set by the user
        gridTemplateColumns: `repeat(${colNum}, 1fr)`,
        gridTemplateRows: `repeat(${colNum}, 1fr)`, // rows would probably need to be auto-created depending on how many elements a user has in the grid workspace
        gridGap: "10px",
      }}
      className="grid-template-area"
    >
      {createSomeDivs(colNum).map((d) => d)}
    </div>
  );
}
