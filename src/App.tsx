import { useState } from "react"

import { GridWorkspace } from "./components/GridWorkspace/GridWorkspace"

import "./App.css"

function App() {
  const [mouseDown, setMouseDown] = useState(false)

  function handleMouseUp() {
    setMouseDown(false)
  }

  function handleMouseDown() {
    setMouseDown(true)
  }

  return (
    <>
      <main id="main-grid" onMouseUp={handleMouseUp}>
        <GridWorkspace mouseDown={mouseDown} handleMouseDown={handleMouseDown} />
      </main>
    </>
  )
}

export default App
