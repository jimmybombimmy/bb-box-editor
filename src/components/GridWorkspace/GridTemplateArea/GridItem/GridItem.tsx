import "./GridItem.css";

interface GridItemProps {
  divKey: string;
}

export function GridItem(props: GridItemProps) {
  const { divKey } = props;
  return <div className="grid-item">{divKey}</div>;
}
