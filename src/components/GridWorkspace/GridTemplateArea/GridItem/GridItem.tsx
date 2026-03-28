import "./GridItem.css";

export function GridItem() {
  return (
    <div
      className="grid-item"
      key={`div` + "i" + 1}
      style={{ border: "3px solid pink" }}
    ></div>
  );
}
