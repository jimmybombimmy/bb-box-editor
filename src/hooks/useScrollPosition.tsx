import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = () => {
      setPosition({ x: window.scrollX, y: window.scrollY });
    };

    updatePosition()
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);
  return position;
};

export default useScrollPosition;