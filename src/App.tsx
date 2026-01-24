import { useState } from "react"

import { GridWorkspace } from "./components/GridWorkspace/GridWorkspace"

import "./App.css"

function App() {
  const [mouseDown, setMouseDown] = useState(false)

  function handleMouseUp() {
    setMouseDown(false)
  }

  return (
    <main id="main-grid" onMouseUp={handleMouseUp}>
      <GridWorkspace mouseDown={mouseDown} setMouseDown={setMouseDown} />
    </main>
  )
}

export default App
